import React from 'react';
import { Route, Routes } from 'react-router';
import AllListings from './AllListings';
import './App.css';
import MyListings from './MyListings';
import ResponsiveAppBar from './ResponsiveAppBar';




function App() {

  return (
    <div>
      
      <ResponsiveAppBar>
      </ResponsiveAppBar>  
      <Routes>
        <Route path="/" element={<AllListings/>}/>
        <Route path="/Mine Annonser" element={<MyListings/>}/>
      
      </Routes>  

    

      
    </div>

  
    
  );

}

export default App;
