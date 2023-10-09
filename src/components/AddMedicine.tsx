import { Autocomplete, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MedicineForUser, User } from "../models";
import { useUserContext } from "./User/UserContext";
import { ifError } from "assert";

export default function AddMedicine(props: any) {

  const { user: us } = useUserContext();

  // add medicine
  const [medId, setMedId] = useState(1);
  const [hour, setHour] = useState<Number>(12);
  const [sumOfPills, setSumOfPills] = useState<Number>(1);
  const [name, setName] = useState<String>("");
  const [note, setNote] = useState<String>("");
  const [status, setStutus] = useState<Boolean>(true);
  const [MedicineName, setMedicineName] = useState<String>("");
  const [userId, setUserId] = useState<any>();

  const [medList, setMedList] = useState([]);



  const setMedArr = (medRes: any) => {
    let medObgs: any = [];
    medRes.forEach((element: any) => {
      const medObj = {
        value: element.id,
        label: element.name
      }
      console.log(medObj);
      medObgs.push(medObj);
    });

    setMedList(medObgs);
  }

  const fetchMedFromApi = async () => {
    const res = await fetch(`https://localhost:7247/api/Medicine`);
    if (!(res).ok) {
      throw Error(`status: ${res.status} is making troubles again😱`);
    }
    else
      if (res.status === 204) {
        alert("לא קיימות תרופות")
      }
      else {
        const medicines = await res.json();
        setMedList(medicines);
        console.log(medicines, "med state")
        setMedArr(medicines);
      }
  };

  const addMedForUser = async () => {

    let mmmmm = new MedicineForUser(2043,4,1,"",1,"אחרי הרבה זמן",true)

    let medicineForUser = new MedicineForUser(
      /* us?.id,*/userId, medId, sumOfPills, name, hour, note, status);

    await addData(mmmmm);
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
    fetchMedFromApi();

  }, []);

  return (
    <div id="addMedicine">
      <Autocomplete disablePortal id="combo-box-demo" options={medList} sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="בחר תרופה" />}></Autocomplete>
        <br></br>
      <input
        id="note" placeholder="הערה " onChange={(e) => {
          {
            setNote(e.target.value);
          }
        }}>

      </input>
      <br></br>
      <input id="sumofpill" type="Number" placeholder="כמות " onChange={(e) => {
        {
          setSumOfPills(Number(e.target.value));
        }
      }}>
      </input>
      <br></br>
      <input id="hour" type="Number" placeholder="שעה" onChange={(e) => {
        {
          setHour(Number(e.target.value));
        }
      }}>

      </input>
      <br></br>
      <button onClick={() => addMedForUser()}>הוסף תרופה</button>
    </div>
  );
}
