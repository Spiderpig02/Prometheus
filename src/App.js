import './App.css';
import { useInfoFromUser } from './IO';
import { getAdsFromUser } from './IO';
import React from 'react';
import { Route, Routes } from 'react-router';
import AllListings from './AllListings';
import './App.css';
import MyListings from './MyListings';
import ResponsiveAppBar from './ResponsiveAppBar';

function App() {

    const user = useInfoFromUser();
    const ad = getAdsFromUser("Askeladden");

    return (
        <div>

            <ResponsiveAppBar>
            </ResponsiveAppBar>

            <Routes>
                <Route path="/" element={<AllListings />} />
                <Route path="/Mine Annonser" element={<MyListings />} />
                <Route path="/Alle Annonser" element={<AllListings />} />

            </Routes>




        </div>



    );

}

export default App;