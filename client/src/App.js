import React from "react";
import { Routes, Route } from "react-router-dom";
import PayPal from './PayPal.js'

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={< PayPal/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;