import { useEffect, useState } from "react"
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [u, setU] = useState();

    const getUserById = async () => {

        const res = await fetch(`https://localhost:7247/api/User/getById?userId=${1}`)
       console.log("leah111111111111111111111 cj");
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
        console.log(user,"user")
        // getUserById()
        console.log(u, "user");

        // if (u == null) {
        //     setUser({ name: "לא רשום" });
        // }
    
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider