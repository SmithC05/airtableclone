import React from "react";
import { Link } from "react-router-dom";
import './login.css';
function Login() {
    return (
        <div className="login-container">
  <div className="login-box">
    <h2>Login</h2>
    <form>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p className="login-text">
      Don’t have an account? <Link to="/signup">Sign up here</Link>
    </p>
  </div>
</div>

    );
}
export default Login;