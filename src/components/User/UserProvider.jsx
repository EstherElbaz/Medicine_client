import { useEffect, useState } from "react"
import { UserContext } from "./UserContext";

const UserProvider = ({ children, userId }) => {
    const [user, setUser] = useState()
    const [u, setU] = useState();

    const getUserById = async () => {

        const res = await fetch(`https://localhost:7247/api/User/getById?userId=${userId}`)

        if (!(res).ok) {
            throw Error(`status: ${res.status} is making troubles again😱`);
        }
        else
            if (res.status === 204) {
                console.log("user is not exist")
            }
            else {

                const ll = await res.json();

                setU(ll);
                return ll;
            }
    }


    useEffect(() => {
        getUserById()

        if (u == null) {
            setUser({ name: "לא רשום" });
        }
    
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider