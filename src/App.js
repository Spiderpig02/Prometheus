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

    //For dark/light mode
    const [themeMode, setThemeMode] = useState('lightMode');
    const toggleThemeMode = () => {
        if (themeMode === 'lightMode') {
            setThemeMode('darkMode');
        } else {
            setThemeMode('lightMode');
        }
    };

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

                <button onClick={toggleThemeMode}>
                    <p style={{
                        color: "whitesmoke", border: "1px black solid",
                        padding: "5px", borderRadius: "10px", backgroundColor: "salmon"
                    }}>
                        {"View Mode"}</p>
                </button>
            </div>
        </div>

    );
}

export default App;
