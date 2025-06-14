import React from 'react';
import { Link } from "react-router-dom";
import './App.css';
import Home from './home';
import Login from './login';  
import Signup from './signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
   <Router>
         
                      <nav>
             <div className="nav-logo">
              <Link to="/signup">Air Table</Link></div>
             <ul>
               <li><Link to="/">Home</Link></li>
               <li><Link to="/login">Login</Link></li>
               <li><Link to="/signup">Sign Up</Link></li>
             </ul>
           </nav>
          
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
   
           </Routes>
         
       </Router>
  );
}
export default App;
