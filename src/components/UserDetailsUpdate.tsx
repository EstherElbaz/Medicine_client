import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../models";

export default function UserDetailsUpdate() {

    const navigate = useNavigate();

    const addUser = async (userToUpdate: User) => {

        let userJson = JSON.stringify(userToUpdate);

        const requestOptions = {
            method: 'PUT',
            body: userJson,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        const res = await fetch(`https://localhost:7247/api/User/1`, requestOptions);
        if (!res.ok) {
            throw Error(`status: ${res.status} is making troubles again😱`);
        }
        else {
            // let user = await res.json();
            navigate("../");
            //למצוא דרך לשלוח את היוזר כפרופס
            sessionStorage.setItem("user", userJson);
        }
    }

    const update = async () => {
        let user: User = new User(userName, password, firstName, lastName, idNum, birthDate, genderId);
        user.id = id;
        addUser(user);
    }

    let u: any = sessionStorage.getItem("user");
    let user: any;
    if (u != null) {
        user = JSON.parse(u);
    }
    const [id, setId] = useState<Number>(user.id);
    const [userName, setuserName] = useState<string>(user.emailAddress);
    const [password, setPassword] = useState<string>(user.password);
    const [confPassword, setConfPassword] = useState<string>(user.password);
    const [firstName, setFirstName] = useState<string>(user.firstName);
    const [lastName, setLastName] = useState<string>(user.lastName);
    const [idNum, setIdNum] = useState<string>(user.identityNumber);
    const [birthDate, setBirthDate] = useState<Date>(user.birthDate);
    const [genderId, setGenderId] = useState<number>(user.genderId);

    return (
        <div className="container">
            <div className="mt-5 m-auto w-50">
                <div id="register" >

                    <input id="userName" value={userName} onChange={(e) => { { setuserName(e.target.value) } }}></input>
                    <br></br>
                    <input id="password" type={"password"} value={password} onChange={(e) => { { setConfPassword(e.target.value) } }}></input>
                    <br></br>
                    <input id="confirmpassword" type={"password"} value={password} onChange={(e) => { { setPassword(e.target.value) } }}></input>
                    <br></br>
                    <input id="firstName" value={firstName} onChange={(e) => { { setFirstName(e.target.value) } }}></input>
                    <br></br>
                    <input id="lastName" value={lastName} onChange={(e) => { { setLastName(e.target.value) } }}></input>
                    <br></br>
                    <button onClick={update}>הרשמה</button>

                </div>
            </div>
        </div>
    )
}