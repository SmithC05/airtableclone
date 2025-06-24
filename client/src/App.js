import React from 'react';
import './App.css';
import Home from './home';
import Login from './login';  
import Signup from './signup';
import Dashboard from './dashboard';
import ProtectedRoute from './protectedroutes';
import CreatePage from "./create";
import TableViewPage from "./tables";
import ProfilePage from "./profile";
import LogoutPage from "./logout";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
function App() {
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return (
   <Router>
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
             <Route path="/dashboard" element={  <ProtectedRoute> <Dashboard /></ProtectedRoute>    } />
              <Route path="/create" element={<ProtectedRoute> <CreatePage /> </ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>} />
              <Route path="/logout" element={<ProtectedRoute> <LogoutPage /> </ProtectedRoute>} />
              <Route path="/tables/:id" element={<ProtectedRoute> <TableViewPage /> </ProtectedRoute>} />
             <Route path="*" element={<div>404 Not Found</div>} />
           </Routes>
         
       </Router>
  );
}
export default App;
