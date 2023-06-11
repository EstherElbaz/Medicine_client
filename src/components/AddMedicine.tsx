import { Autocomplete, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MedicineForUser, User } from "../models";
import { useUserContext } from "./User/UserContext";

export default function AddMedicine(props: any) {

  
  const { user: us } = useUserContext();
  const [medId, setMedId] = useState(1);
  const [hour, setHour] = useState<Number>(12);
  const [sumOfPills, setSumOfPills] = useState<Number>(1);
  const [name, setName] = useState<String>("");
  const [note, setNote] = useState<String>("");
  const [status, setStutus] = useState<Boolean>(true);
  const [MedicineName, setMedicineName] = useState<String>("");
  const [userId,setUserId] = useState<any>();

  console.log(us);

  const opt = [
    { value: 1, label: "אקמול" },
    { value: 2, label: "ריטלין" },
    { value: 89, label: "אוקלפן" },
    { value: 92, label: "ריגוומין" },
    { value: 19, label: "אופטלגין" },
    { value: 116, label: "מוקסיפן" },
    { value: 15, label: "אדויל" },
    { value: 14, label: "רפאפן" },
  ];

  const fetchMedFromApi = () => { };

  const addMedForUser = async () => {
    
    let medicineForUser = new MedicineForUser(
     /* us?.id,*/
     userId,
      medId,
      sumOfPills,
      name,
      hour,
      note,
      status,
      MedicineName
    );
    console.log(medicineForUser);
    await addData(medicineForUser);
  };
  const addData = async (medToAdd: MedicineForUser) => {
    let medJson = JSON.stringify(medToAdd);

    const requestOptions = {
      method: "POST",
      body: medJson,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(
      `https://localhost:7247/api/MedicineForUser`,
      requestOptions
    );
    if (!res.ok) {
      throw Error(`status: ${res.status} is making troubles again😱`);
    } else {
      alert("התרופה נוספה בהצלחה");
    }
  };

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    //let u = sessionStorage.getItem("user");
    // let user: User;
    // if (u != null) {
    //   user = JSON.parse(u);
    // } else {
    //   alert("משתמש לא מחובר");
    // }
  },[]);

  return (
    <div>
      <h1>רשימת התרופות ל{us?.firstName}</h1>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={opt}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="תרופה" />}
      ></Autocomplete>
      <input
        id="note"
        placeholder="הערה "
        onChange={(e) => {
          {
            setNote(e.target.value);
          }
        }}
      ></input>
      <input
        id="sumofpill"
        type="Number"
        placeholder="כמות "
        onChange={(e) => {
          {
            setSumOfPills(Number(e.target.value));
          }
        }}
      ></input>
      <input
        id="hour"
        type="Number"
        placeholder="שעה"
        onChange={(e) => {
          {
            setHour(Number(e.target.value));
          }
        }}
      ></input>
      <button onClick={() => addMedForUser()}>הוסף תרופה</button>
    </div>
  );
}
