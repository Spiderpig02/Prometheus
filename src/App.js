import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import AllListings from './AllListings';
import './App.css';
import MyListings from './MyListings';
import LagAnnonse from './LagAnnonse'
import ResponsiveAppBar from './ResponsiveAppBar';
import LoginUI from './LoginUI';
import MyPage from './MyPage';
import RegisterNewUser from './NewUser';
import OtherUser from './OtherUser';

function App() {

 /*  const pull_data = (data) => {
    console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  } */

  const [user, setUser] = useState("NullOtherUser");
  
  console.log(user);



  return (
    <div>
      <ResponsiveAppBar>
      </ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<AllListings recieveUser = {user => setUser(user)}/>} />
        <Route path="/Mine Annonser" element={<MyListings   />} />
        <Route path="/Alle Annonser" element={<AllListings recieveUser = {user => setUser(user)}/>}/>
        <Route path="/OtherUser" element={<OtherUser getuser={user} />} />
        <Route path="/Lag Annonse" element={<LagAnnonse />} />
        <Route path ="/Logg inn" element={<LoginUI />} />
        <Route path ="/Min Profil" element={<MyPage/>} />
        <Route path ="/Ny bruker side" element={<RegisterNewUser/>} />
      </Routes>
    </div>


  );

}

export default App;
