import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router';
import AllListings from './AllListings';
import './App.css';
import MyListings from './MyListings';
import LagAnnonse from './LagAnnonse'
import ResponsiveAppBar from './ResponsiveAppBar';
import LoginUI from './LoginUI';
import MyPage from './MyPage';


function App() {

  return (
    <div>
      
      <ResponsiveAppBar>
      </ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<AllListings />} />
        <Route path="/Mine Annonser" element={<MyListings />} />
        <Route path="/Alle Annonser" element={<AllListings />} />
        <Route path="/Lag Annonse" element={<LagAnnonse />} />
        <Route path ="/Logg inn" element={<LoginUI />} />
        <Route path ="/Min Profil" element={<MyPage/>} />

      </Routes>




    </div>



  );

}

export default App;
