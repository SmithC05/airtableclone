import React from "react";
import './dashboard.css';
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <h2>Dashboard</h2>
                <p>Welcome to your dashboard!</p>
                <div className="dashboard-links">
                    <Link to="/profile">Profile</Link>
                    <Link to="/logout">Logout</Link>
                </div>
                <div className="dashboard-content">
                    <p>Here you can manage your account, view your activity, and more.</p>
                </div>
                <div className="dashboard-actions">
                    <button className="action-button">Create Your Ideas Into Table</button>
                    <button className="action-button">View Your Ideas</button>
                </div>
                <div className="dashboard-footer">
                    <p>&copy; 2025 Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}