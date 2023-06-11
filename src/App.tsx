import React, { useEffect, useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserDetailsUpdate from './components/UserDetailsUpdate';
import MyMedicines from './components/MyMedicines';
import UserProvider from './components/User/UserProvider';
import { Dialog } from '@mui/material';

import FullScreenDialog from './components/dial';
import { log } from 'console';


function App() {
  const [userId ,setUserId]=useState('');
  useEffect(()=>{ 
    console.log("leahhh");
    
  const id =localStorage.getItem("userId")
  console.log(id,"id");
  
  if(typeof id  ==='string'){
    console.log(id,"id")
      setUserId(id)
  }
  },[])

  document.title = "your medicines";
  return (
    <UserProvider userId={localStorage.getItem("userId")}>
    <BrowserRouter>
      <Routes>
        {userId?<>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/update' element={<UserDetailsUpdate />} />
        <Route path='/medicines' element={<MyMedicines />} />
        <Route path ='/Dialog' element={<FullScreenDialog/>}/>
        <Route path="/login" element={<Login />} />
        </>: 
        <Route path="/" element={<Login />} />
     
      } 
     </ Routes>
    </BrowserRouter>
    </UserProvider>

  );
}

export default App;

// function useEfffect(arg0: () => void) {
//   throw new Error('Function not implemented.');
// }
