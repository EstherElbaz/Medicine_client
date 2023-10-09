import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import UserDetailsUpdate from './components/UserDetailsUpdate';
import MyMedicines from './components/MyMedicines';
import FormDialog from './components/formDlg';


export default function RoutesMap() {

    const [userId, setUserId] = useState('');

    useEffect(() => {
        console.log("leahhh");

        const id = localStorage.getItem("userId")
        console.log(id, "id");

        if (typeof id === 'string') {
            console.log(id, "id")
            setUserId(id)
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {userId ? <>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/di" element={<FormDialog />} /> */}
                    <Route path="/register" element={<Register />} />
                    <Route path='/update' element={<UserDetailsUpdate />} />
                    <Route path='/medicines' element={<MyMedicines />} />
                    <Route path="/login" element={<Login />} />

                </> :
                    <Route path="/" element={<Login />} />

                }
            </ Routes>
        </BrowserRouter>
    )

}