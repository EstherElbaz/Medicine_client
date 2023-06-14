
import React, { useState } from "react";
import { User } from "../models";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.css";
import { SelectChangeEvent } from "@mui/material";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
export default function Register() {

    const [userName, setuserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confPassword, setConfPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [idNum, setIdNum] = useState<string>("");
    const [birthDate, setBirthDate] = useState<any>(new Date);
    const [genderId, setGenderId] = useState<any>(2);

    const options = [
        { value: 1, label: "בן" },
        { value: 2, label: "בת" },
    ];

    const navigate = useNavigate();

    const addUser = async (newUser: User) => {

        let userJson = JSON.stringify(newUser);

        const requestOptions = {
            method: 'POST',
            body: userJson,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        const res = await fetch(`https://localhost:7247/api/User`, requestOptions);
        if (!res.ok) {
            console.log()
            throw Error(`status: ${res.status} is making troubles again😱`);
        }
        else {
            let user = await res.json();
            await sessionStorage.setItem("user", JSON.stringify(user));
            console.log(user);
            navigate("../");
            //למצוא דרך לשלוח את היוזר כפרופס
        }
    }

    const register = async () => {
       
        let user = new User(userName, password, firstName, lastName, idNum, birthDate, genderId);
        addUser(user);
    }

    return (
        <div className="container">
            <div className="mt-5 m-auto w-50">
                <div id="register" >

                    <input id="userName" type="email" placeholder="כתובת מייל" onChange={(e) => { { setuserName(e.target.value) } }}></input>
                    <br></br>
                    <input id="password" type={"password"} placeholder="סיסמה" onChange={(e) => { { setConfPassword(e.target.value) } }}></input>
                    <br></br>
                    <input id="confirmpassword" type={"password"} placeholder="אימות סיסמה" onChange={(e) => { { setPassword(e.target.value) } }}></input>
                    <br></br>
                    <br></br>
                    <input id="firstName" placeholder="שם פרטי" onChange={(e) => { { setFirstName(e.target.value) } }}></input>
                    <br></br>
                    <input id="lastName" placeholder="שם משפחה" onChange={(e) => { { setLastName(e.target.value) } }}></input>
                    <br></br>
                    <input id="idNum" placeholder="תעודת זהות" onChange={(e) => { { setIdNum(e.target.value) } }}></input>
                    <br></br>
                    <select id="genderSelect" onChange={(event)=>setGenderId((event.currentTarget.value) )}>
                        <option value={1}>בן</option>
                        <option value={2}>בת</option>
                    </select>
                    <br></br>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label={"תאריך לידה"} onChange={(newValue) => setBirthDate(newValue)} />
                        </DemoContainer>
                    </LocalizationProvider>
                    <br></br>
                  
                    {/* <Select   value={genderId} options={options} onChange={handleChange} /> */}
                  
                    <button onClick={register}>הרשמה</button>


                </div>
            </div>
        </div>
    )

}
