import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home'

function App() {
  //FETCH DATA IN HERE? PASS TO COMPONENTS?
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={< Home/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;