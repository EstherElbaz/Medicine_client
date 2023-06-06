import React, { useContext, useEffect, useState } from "react";
import '../App.css'
import UserContext from "./User/UserContext";


export default function Home() {

     const [count, setCount] = useState(2);
    const { user: us } = useContext(UserContext)

    useEffect(() => {
        document.title = `לחצת ${count} פעמים`;

    });

    let u: any = sessionStorage.getItem("user");
    let user: any;
    let userName = "";
    if (u != null) {
        user = JSON.parse(u);
        userName = user.firstName;
    }

    return (
        <div>
            <h1>hello {us?.firstName}</h1>
            <button onClick={() => setCount(count + 1)}>set number title</button>
        </div>
    )

}