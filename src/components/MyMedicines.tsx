import userEvent from "@testing-library/user-event";
import React from "react";
import { useEffect, useState } from "react";
import { MedicineForUser, User } from "../models";
import AddMedicine from "./AddMedicine";
import MedicineToShow from "./MedicineToShow";
import { useUserContext } from "./User/UserContext";

export default function MyMedicines() {
    const[flag ,setFlag]=useState(false)
    const [medicines, setMedicines] = useState<any>([]);
    const [takingMedicines, setTakingMedicines] = useState<any>([]);
    const [addMed, setAddMed] = useState(false);
    const { user:yyy } = useUserContext()
    
    let medlist:any[]=[]
    const TakingMedication = async ()=>{
        const res = await fetch(`https://localhost:7247/api/TakingMedication`);
        if (!res.ok) {
            throw console.error(`error: stautus code is ${res.status}`);
        }
        else if (res.status == 204) {
            alert("לא קיימות תרופות");
        }
        
        else {
          
          medlist=await res.json()
          console.log(medlist);
    }
}
    const findExsit = async () =>{
        const filterArray: string[] = [];
            for (const medication of  filteredAndOrderedArray) {
                const medicationId=medication.id;
                for (const med of medlist) {
                    const medicationfor=med.medicineForUserId;
                    console.log(medicationfor,"1111111111111");
                    console.log(medlist)
                    if (medicationfor==medicationId) {
                        console.log(medication);
                        setFlag(true)
                    }
                }
                if(flag==false){
                    filterArray.push(medication); }
                else{
                    setFlag(false)}
            }
            console.log(filterArray);
            
           setMedicines(filterArray)
    }
        
    let filteredAndOrderedArray:any[]=[] 
    
    const getMedicinesForUser = async () => {
        const tr=localStorage.getItem("userId")
        const res = await fetch(`https://localhost:7247/api/MedicineForUser?userId=${tr}`);
        if (!res.ok) {
            throw console.error(`error: stautus code is ${res.status}`);
        }
        else if (res.status == 204) {
            alert("לא קיימות תרופות");
        }
        else {
            const medicinesList = await res.json();
            filteredAndOrderedArray = medicinesList
                .filter((item: { status: Boolean; }) => item.status == true)
                 .sort((a: { hour: number; }, b: { hour: number; }) => a.hour - b.hour);
                 console.log(filteredAndOrderedArray);
                 
            setMedicines(filteredAndOrderedArray)
              
        }
    }
    const func = async () =>{
        await getMedicinesForUser() ;
        await  TakingMedication();
        await findExsit()
    }

    useEffect(() => { 
       func();   
    }, []);


    return (
        <div>
           
            <h1>רשימת התרופות ל{yyy?.firstName}  </h1>
            
            <div>
                {medicines.map((med: any) => {
                    return (
                        <><div>
                            <MedicineToShow name={med.name} note={med.note} hour={med.hour} id={med.id}></MedicineToShow>
                        </div><br /></>
                    );
                })}
            </div>
            <button id="flowButton" onClick={() => setAddMed(true)}>➕</button>
            {addMed && <AddMedicine medList={medicines}></AddMedicine>}
        </div>
    )
}