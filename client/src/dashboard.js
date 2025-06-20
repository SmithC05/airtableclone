import React from "react";
import './dashboard.css';
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2 className="dashboard-heading">Welcome Back 👋</h2>

        <div className="dashboard-buttons">
          <Link to="/tables" className="dashboard-btn">+ New Table</Link>
          <Link to="/tables" className="dashboard-btn">📋 View Tables</Link>
          <Link to="/profile" className="dashboard-btn">👤 Profile</Link>
          <Link to="/logout" className="dashboard-btn logout-btn">🚪 Logout</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
