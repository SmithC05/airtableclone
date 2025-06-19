import React from "react";
import './signup.css';
import { Link } from "react-router-dom";

function Signup() {
    return (
        <div className="signup-container">
  <div className="signup-box">
    <h2>Sign Up</h2>
    <form>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" name="confirm-password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <p className="login-text">
      Already have an account? <Link to="/login">Login here</Link>
    </p>
  </div>
</div>

    );  
}
export default Signup;