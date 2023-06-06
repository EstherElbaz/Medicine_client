import userEvent from "@testing-library/user-event";
import React from "react";
import { useEffect, useState ,useContext} from "react";
import { User } from "../models";
import AddMedicine from "./AddMedicine";
import MedicineToShow from "./MedicineToShow";
import UserContext from "./User/UserContext";

export default function MyMedicines() {

    const [medicines, setMedicines] = useState([]);
    const [addMed, setAddMed] = useState(false);
    const { user: us } = useContext(UserContext)
    const getMedicinesForUser = async (userId: Number) => {


        const res = await fetch(`https://localhost:7247/api/MedicineForUser?userId=${userId}`);
        if (!res.ok) {
            throw console.error(`error: stautus code is ${res.status}`);
        }
        else if (res.status == 204) {
            alert("לא קיימות תרופות");
        }
        else {
            const medicinesList = await res.json();
            await setMedicines(medicinesList);
            console.log(medicines);
        }
    }

    useEffect(() => {
        let u = (sessionStorage.getItem("userId"));
        let user: User;
        if (u != null) {
            user = JSON.parse(u);
            //להגדיר את הסטטי של יוזר ניים ויוזר אי די 
            getMedicinesForUser(user.id);
        }
        else {
            alert("משתמש לא מחובר")
        }
    }, []);
    
    return (
        <div>
            <h1> רשימת התרופות למשתמש</h1>
            <div>
                {medicines.map((med: any) => {
                    return (
                        <div>
                            <MedicineToShow name={med.medicine} note={med.note} hour={med.hour} id={med.id}></MedicineToShow>
                        </div>
                    );
                })}
            </div>
            <button onClick={() => setAddMed(true)}>➕</button>
            {addMed && <AddMedicine medList={medicines}></AddMedicine>}
        </div>
    )
}