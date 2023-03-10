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
import UpdateAd from './UpdateAd';


function App() {

  


  const [adID, setAdID] = useState("AdNULL");
  return (
    <div>
      <ResponsiveAppBar>
      </ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<AllListings />} />
        <Route path="/Mine Annonser" element={<MyListings recieveClickedAd = {ad => setAdID(ad)}/>} />
        <Route path="/Alle Annonser" element={<AllListings />} />
        <Route path="/Lag Annonse" element={<LagAnnonse />} />
        <Route path ="/Logg inn" element={<LoginUI />} />
        <Route path ="/Min Profil" element={<MyPage/>} />
        <Route path ="/Ny bruker side" element={<RegisterNewUser/>} />
        <Route path ="/Oppdater Annonse" element={<UpdateAd getAd={adID}/>} />


      </Routes>




    </div>



  );

}

export default App;
