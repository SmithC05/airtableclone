import React from 'react';
import { Link } from "react-router-dom";
import './App.css';
import Home from './home';
import Login from './login';  
import Signup from './signup';
import Dashboard from './dashboard';
import ProtectedRoute from './protectedroutes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
   <Router>
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
             <Route path="/dashboard" element={  <ProtectedRoute> <Dashboard /></ProtectedRoute>    } />
             <Route path="/profile" element={<div>Profile Placeholder</div>} />
             <Route path="/logout" element={<div>Logout Placeholder</div>} />
   
           </Routes>
         
       </Router>
  );
}
export default App;
