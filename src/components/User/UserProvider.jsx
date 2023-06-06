import { useEffect, useState } from "react"
import UserContext from "./UserContext";


const UserProvider = ({ children, userId }) => {
    const [user, setUser] = useState({ name: "לא רשום" });

    const getUserById = async() => {
        
        const res = await fetch(`https://localhost:7247/api/User?userId=${userId}`)
        if (!(res).ok) {
            throw Error(`status: ${res.status} is making troubles again😱`);
        }
        else
            if (res.status === 204) {
                console.log("user is not exist")
            }
            else {
                return res.json();
            }
    }



    useEffect(() => {
        if (userId) {
            const u = getUserById()
            setUser(u);
        }
        setUser({ name: "לא רשום" });
    }, [userId]);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider


