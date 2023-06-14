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
    const [addMed, setAddMed] = useState(false);
    const { user:yyy } = useUserContext()
    
    
    const TakingMedication = async ()=>{
        debugger
        const res = await fetch(`https://localhost:7247/api/TakingMedication`);
        if (!res.ok) {
            throw console.error(`error: stautus code is ${res.status}`);
        }
        else if (res.status == 204) {
            alert("לא קיימות תרופות");
        }
        else {
          
          const medlist=await res.json()
          console.log(medlist,"after get data of taking medication ")
            const filterArray: string[] = [];
        debugger
            for (const medication of  filteredAndOrderedArray) {
                if (!medlist.includes(medication)) {
                    filterArray.push(medication);
                }
            }
           setMedicines(filterArray)
           
        

    }
 

        }
    let filteredAndOrderedArray:any[]=[]
    const func = async () =>{
        await getMedicinesForUser() ;
        await  TakingMedication();
    }
    const getMedicinesForUser = async () => {
        const tr=localStorage.getItem("userId")
        console.log({ yyy }, "jjj");
        const res = await fetch(`https://localhost:7247/api/MedicineForUser?userId=${tr}`);
        console.log(res);
        if (!res.ok) {
            throw console.error(`error: stautus code is ${res.status}`);
        }
        else if (res.status == 204) {
            alert("לא קיימות תרופות");
        }
        else {
            console.log(res.status);
            const medicinesList = await res.json();
            filteredAndOrderedArray = medicinesList
                .filter((item: { status: Boolean; }) => item.status == true)
                 .sort((a: { hour: number; }, b: { hour: number; }) => a.hour - b.hour);
            console.log(filteredAndOrderedArray,"filteredAndOrderedArray");
            setMedicines(filteredAndOrderedArray)
            console.log(medicines,"medicine....................");
            
        }
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
                        <div>
                            <MedicineToShow name={med.name} note={med.note} hour={med.hour} id={med.id}></MedicineToShow>
                        </div>
                    );
                })}
            </div>
            <button id="flowButton" onClick={() => setAddMed(true)}>➕</button>
            {addMed && <AddMedicine medList={medicines}></AddMedicine>}
        </div>
    )
}