import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './compoenents/Sidebar/Sidebar';
import Main from "./compoenents/Main/Main.jsx";
import LoginPage from "./compoenents/Main/LoginPage.jsx";
import CreateAccountPage from "./compoenents/Main/CreateAccountPage.jsx";

const App = ()=>{
  return (
      <Routes>
        <Route path="/" element={
          <>
            <Sidebar />
            <Main />
          </>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
      </Routes>
  )
}
export default App;