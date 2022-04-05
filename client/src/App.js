import React from "react";
import { Routes, Route } from "react-router-dom";
import PayPal from './PayPal.js';


export default function App() {
  return (
    <>
    
    <PayPal />   
      <div>
        <Routes>
          <Route path="/" element={< PayPal/>} />
        </Routes>
      </div>
    </> 
  ); 
  
}



    