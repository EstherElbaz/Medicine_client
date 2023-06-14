import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./User/UserContext";

export default function Login() {
    const [userName, setuserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // const [userId,setUser] = useState<any>({})
    const { user: yyy, setUser } = useUserContext();
    const navigate = useNavigate();
  
    const login = async () => {
        
        const res = await fetch(`https://localhost:7247/api/User?userName=${userName}&password=${password}`)
        if (!(res).ok) {
            throw Error(`status: ${res.status} is making troubles again😱`);
        }
        else
            if (res.status === 204) {
                let conf = window.confirm("אנחנו לא מכירים עדיין. רוצה להירשם עכשיו?");
                if (conf) {
                    navigate("../register", { replace: true });
                }
                else {
                    console.log("חבל");
                }
            }
            else {
                const user = await res.json();
                localStorage.setItem("userId", user.id);
                sessionStorage.setItem("user", JSON.stringify(user));
                
                console.log(user,"useer");
                
                await (setUser && setUser(user));
                console.log(yyy,"uuuu");
                

                navigate("../medicines", { replace: true });
            }
    }

    
    const getUserById = async () => {
       if(!yyy) {
        return
    }
        const res = await fetch(`https://localhost:7247/api/User/getById?userId=${yyy?.id}`)
       console.log("leah111111111111111111111 cj",yyy);
        if (!(res).ok) {
            throw Error(`status: ${res.status} is making troubles again😱`);
        }
        else
            if (res.status === 204) {
                console.log("user is not exist")
            }
            else {

                const ll = await res.json();

                // setU(ll);
                return ll;
            }
    }
    useEffect(() => {
         getUserById()
        console.log({ yyy },"6yttxgfsdchhyjulpo");
    }, [yyy])


    return (
        <div id="login" >
            <div id="form">
            <h1>שלום 😊</h1>
            <br />
            <input id="userName" placeholder="כתובת מייל" onChange={(e) => { { setuserName(e.target.value) } }}></input>
            <br /><br />
            <input id="password"  placeholder="סיסמה" onChange={(e) => { { setPassword(e.target.value) } }}></input>
            </div><br /><br />
            <button id="btn" onClick={login}>התחבר</button>

        </div>
    )
}



