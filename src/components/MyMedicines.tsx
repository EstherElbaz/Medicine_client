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
          console.log(medlist,"medlist");
    }
} 
    const filterArray: any[] = [];
    const findExsit = async () =>{
        debugger;
        console.log(filterArray,"filterArray before");
            for (const medication of  filteredAndOrderedArray) {
                const medicationId=medication.id;
                console.log(medicationId,"medicationId");
                
                for (const med of medlist) {
                    const medicationfor=med.medicineForUser;
                    console.log(medicationfor,"medicationfor");
                    console.log(medlist,"medlist in side for ")
                    if (medicationfor==medicationId) {
                        console.log(medication,"medic to take");
                        Promise.resolve()
                        .then(() => { setFlag(true)})
                        .then(() => {
                            console.log(flag, "flag after set")
                            chckFlag(medication)
                        })
                        break 
                    }
                }
            }
            console.log(filterArray);
            setMedicines(filterArray)
    }
    const chckFlag=async(medication:MedicineForUser)=>{
        console.log(flag,"flag in chckFlag");
        
        if(flag===false){
            filterArray.push(medication); 
            console.log(filterArray,"filterArray111111111111111111111111  in chckFlag");
        }
        else{
            setFlag(false)}
    }
        
    let filteredAndOrderedArray:any[]=[] 
    
    const getMedicinesForUser = async () => {
        debugger
        const tr=localStorage.getItem("userId")
        console.log(yyy,"yyy");
        
        const userIdfor=yyy?.id;
        console.log(userIdfor,"userIdfor");
        
        const res = await fetch(`https://localhost:7247/api/MedicineForUser?userId=${userIdfor}`);
        if (!res.ok) {
            throw console.error(`error: stautus code is ${res.status}`);
        }
        else if (res.status == 204) {
            alert("לא קיימות תרופות");
        }
        else {
            const medicinesList = await res.json();
            console.log(medicinesList,"before filter");
            
            filteredAndOrderedArray = medicinesList
                .filter((item: { status: Boolean; }) => item.status == true)
                 .sort((a: { hour: number; }, b: { hour: number; }) => a.hour - b.hour);
                 console.log(filteredAndOrderedArray,"filteredAndOrderedArray");
                 
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