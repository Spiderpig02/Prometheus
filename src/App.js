import './App.css';
import React, { useState, useEffect } from 'react';
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
import OtherUser from './OtherUser';
import AdminPage from './AdminPage';

function App() {

    /*  const pull_data = (data) => {
       console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
     } */

    const [user, setUser] = useState("NullOtherUser");
    const [themeMode, setThemeMode] = useState('lightMode');
    const [adID, setAdID] = useState("AdNULL");

    useEffect(() => {
        document.body.className = themeMode;
    }, [themeMode]);

      return (
        <div>
            <ResponsiveAppBar>
            </ResponsiveAppBar>
            <div id="pageWrapper" className={`App ${themeMode}`}>
                <Routes>
                    <Route path="/" element={<AllListings recieveUser={user => setUser(user)} />} />
                    <Route path="/Mine Annonser" element={<MyListings recieveClickedAd={ad => setAdID(ad)} />} />
                    <Route path="/Alle Annonser" element={<AllListings recieveUser={user => setUser(user)} />} />
                    <Route path="/OtherUser" element={<OtherUser getuser={user} />} />
                    <Route path="/Lag Annonse" element={<LagAnnonse />} />
                    <Route path="/Logg inn" element={<LoginUI />} />
                    <Route path="/Min Profil" element={<MyPage />} />
                    <Route path="/Ny bruker side" element={<RegisterNewUser />} />
                    <Route path="/Oppdater Annonse" element={<UpdateAd getAd={adID} />} />
                </Routes>
            </div>
        </div>
    );
  
  }
export default App;
