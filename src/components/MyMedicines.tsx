import userEvent from "@testing-library/user-event";
import React from "react";
import { useEffect, useState } from "react";
import { MedicineForUser, User } from "../models";
import AddMedicine from "./AddMedicine";
import MedicineToShow from "./MedicineToShow";
import { useUserContext } from "./User/UserContext";
import { log } from "console";



export default function MyMedicines() {

    const [medicines, setMedicines] = useState<any>([]);
    const [takingMedicines, setTakingMedicines] = useState<any>([]);
    const [addMed, setAddMed] = useState(false);
    const { user:yyy } = useUserContext()
    
    
    const TakingMedication = async ()=>{
        const res = await fetch(`https://localhost:7247/api/TakingMedication`);
        if (!res.ok) {
            throw console.error(`error: stautus code is ${res.status}`);
        }
        else if (res.status == 204) {
            alert("לא קיימות תרופות");
        }
        else {
          
          const medlist=await res.json()
          setTakingMedicines(medlist)
          const filterArray: string[] = [];
            for (const medication of  filteredAndOrderedArray) {
                const medicationId=medication.id
                for(const med of medlist )
                if (med.id==medicationId) {
                    filterArray.push(medication);   
                }
            }
           setMedicines(filterArray)

    }
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
            setMedicines(filteredAndOrderedArray)
            
            
        }
    }
    const func = async () =>{
        await getMedicinesForUser() ;
        await  TakingMedication();
    }


    useEffect(() => { 
       func();   
    }, []);


    

    return (
        <div>
            <h1> רשימת התרופות למשתמש</h1>
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