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


function App() {

    const [themeMode, setThemeMode] = useState('lightMode');

    useEffect(() => {
        document.body.className = themeMode;
    }, [themeMode]);


    return (
        <div>
            <ResponsiveAppBar>
            </ResponsiveAppBar>
            <div id="pageWrapper" className={`App ${themeMode}`}>
                <Routes>
                    <Route path="/" element={<AllListings />} />
                    <Route path="/Mine Annonser" element={<MyListings />} />
                    <Route path="/Alle Annonser" element={<AllListings />} />
                    <Route path="/Lag Annonse" element={<LagAnnonse />} />
                    <Route path="/Logg inn" element={<LoginUI />} />
                    <Route path="/Min Profil" element={<MyPage />} />
                    <Route path="/Ny bruker side" element={<RegisterNewUser />} />
                </Routes>
            </div>
        </div>

    );
}

export default App;
