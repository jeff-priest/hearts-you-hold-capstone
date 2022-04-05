import React from "react";
import { Routes, Route } from "react-router-dom";
import PayPal from './components/PayPal.js';


export default function App() {
  return (
    <>
    
    <PayPal />   
      <div>
        <Routes>
          <Route path="/" element={< Home/>} />
        </Routes>
      </div>
    </> 
  ); 
  
}



    