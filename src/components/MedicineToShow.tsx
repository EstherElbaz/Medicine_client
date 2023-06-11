import { Checkbox } from "@mui/material"
import React, { useState } from "react"
import { TakingMedication } from "../models";

export default function MedicineToShow(props: any) {


    //const [status,setStutus] = useState();
    const [isToken, setIsToken] = useState(false);

    console.log(isToken);

    const addTakingMedication = async (tmObj: TakingMedication) => {

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(tmObj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        const res = await fetch(`https://localhost:7247/api/TakingMedication`);
        if (!res.ok) {
            throw console.error(`stautus: ${res.status}. try again later`);
        }
        else{
            console.log(res.json)
            //לעשות את הצק בוקס דיסאבל
            alert(`לקחת את התרופה ${props.name}`)
        }
    }

    const ITtokmymedicine = async () => {
        setIsToken(!isToken)
        const tmObj: TakingMedication = new TakingMedication(props.id, new Date());
        addTakingMedication(tmObj);
    }


    return (
        <div className={"medicine"}>
            <h1>in medicine to sh</h1>
            <h1 className={"medicineName"}>name:{props.name}</h1>
            <h3>{props.hour}</h3>
            <h3>{props.note}</h3>
            <Checkbox onClick={ITtokmymedicine}></Checkbox>
        </div>
    )
}