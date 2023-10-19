import userEvent from "@testing-library/user-event";
import React from "react";
import { useEffect, useState } from "react";
import { MedicineForUser, User } from "../models";
import AddMedicine from "./AddMedicine";
import MedicineToShow from "./MedicineToShow";
import { useUserContext } from "./User/UserContext";
import { log } from "util";


export default function MyMedicines() {
    const [medicines, setMedicines] = useState<any>([]);
    const [takingMedicines, setTakingMedicines] = useState<any>([]);
    const [addMed, setAddMed] = useState(false);
    const { user:yyy } = useUserContext()
    let medlist:any[]=[]
    const filterArray: any[] = [];
    let filteredAndOrderedArray:any[]=[]
    const TakingMedication = async ()=>{
        const res = 
        await fetch(`https://localhost:7247/api/TakingMedication`);
        if (!res.ok) {
            throw console.
            error(`error: stautus code is ${res.status}`);
        }
        else if (res.status == 204) {
            alert("לא קיימות תרופות");
        }
        else {
          medlist=await res.json()
          console.log(medlist,"medlist");
    }
} 
    
    const findmed =async ()=>{
        for (const medication of  filteredAndOrderedArray) {
            const medicationId=medication.id;
            const myFlag:boolean=checkexsit(medicationId)
            if(myFlag===false ){
                filterArray.push(medication);
            }
        }
            setMedicines(filterArray)
            
    } 
    
    function checkexsit(id: number): boolean {
        // debugger
         for (const med of medlist) {
            const medicationfor=med.medicineForUser;
            if (id===medicationfor){
                return true  ;
            }
        }
        return false   ;
      
    }
        
     
    const getMedicinesForUser = async () => {
        const id=yyy?.id;
        const res = await 
        fetch(`https://localhost:7247/api/MedicineForUser?userId=${id}`);
        if (!res.ok) {
            throw console.error(`error: stautus code is${res.status}`);
        }
        else if (res.status == 204) {
            alert("לא קיימות תרופות");
        }
        else {
            const medicinesList = await res.json();
            filteredAndOrderedArray = medicinesList
                .filter((item: { status: Boolean; }) => 
                         item.status == true)
                 .sort((a: { hour: number; }, 
                        b: { hour: number; }) => a.hour - b.hour);   
            setMedicines(filteredAndOrderedArray)    
        }
    }

    const func = async () =>{
        await getMedicinesForUser() ;
        await  TakingMedication();
        await findmed()
    }

    useEffect(() => { 
       func();   
    }, []);


    return (
        <div>
            <h1>רשימת התרופות ל{yyy?.firstName} </h1>
            <div>
                {medicines.map((med: any) => {
                    return (
                        <><div>
                            <MedicineToShow name={med.name} 
                            note={med.note} 
                            hour={med.hour} id={med.id}>
                        </MedicineToShow>
                        </div><br /></>
                    );
                })}
            </div>
            <button id="flowButton" onClick={() => setAddMed(true)}>
                ➕</button>
            {addMed && <AddMedicine medList={medicines}></AddMedicine>}
        </div>
    )
 }
