import userEvent from "@testing-library/user-event";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { MedicineForUser, User } from "../models";
import AddMedicine from "./AddMedicine";
import MedicineToShow from "./MedicineToShow";
import { useUserContext } from "./User/UserContext";

export default function MyMedicines() {

    const [medicines, setMedicines] = useState<any>([]);
    const [addMed, setAddMed] = useState(false);
    const { user:yyy } = useUserContext()

    console.log(yyy, "user from context");

    const getMedicinesForUser = async () => {
        // function compare(a: MedicineForUser, b: MedicineForUser) {
        //     if (a.Hour < b.Hour) {
        //         return -1;
        //     }
        //     if (a.Hour > b.Hour) {
        //         return 1;
        //     }
        //     return 0;
        // }

        console.log(yyy?.id, "jjj");
        const tr=localStorage.getItem("userId")
        const res = await fetch(`https://localhost:7247/api/MedicineForUser?userId=${tr}`);
        console.log(res);

        if (!res.ok) {
            throw console.error(`error: stautus code is ${res.status}`);
        }
        else if (res.status == 204) {
            alert("לא קיימות תרופות");
        }
        else {

            const medicinesList = await res.json();
            var medicinesListByStusus = [];
            for (var e in medicinesList) {

                //update to filter insted of for loop
                if (medicinesList[e].status) {
                    medicinesListByStusus.push(medicinesList[e]);
                }
            }
            const filteredAndOrderedArray = medicinesList
                .filter((item: { status: Boolean; }) => item.status == true)
                /*.sort((a, b) => a.ts - b.ts);*/


            medicinesListByStusus.sort(compare);
            await setMedicines(medicinesListByStusus);
            console.log(medicines);
        }
    }


    useEffect(() => {
        // let u = (sessionStorage.getItem("user")); /*user.id to use usercontext*/
        // let user: User;
        // if (user?.id != null) {
        // user = JSON.parse(u);
        getMedicinesForUser();
        // }
        // else {
        //     alert("משתמש לא מחובר")
        // }
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
            <button onClick={() => setAddMed(true)}>➕</button>
            {addMed && <AddMedicine medList={medicines}></AddMedicine>}
        </div>
    )
}