import React, { useEffect, useState } from "react";
import './dashboard.css';
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/tables", {
      withCredentials: true
    }).then((res) => {
      setTables(res.data.tables);
    }).catch((err) => {
      console.error("Error fetching tables:", err);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2 className="dashboard-heading">Welcome Back 👋</h2>

        <div className="dashboard-buttons">
          <Link to="/create" className="dashboard-btn">+ New Table</Link>
          <Link to="/profile" className="dashboard-btn">👤 Profile</Link>
          <Link to="/logout" className="dashboard-btn logout-btn">🚪 Logout</Link>
        </div>

        <div className="table-list">
          <h3>Your Tables 📋</h3>
          {tables.length === 0 ? (
            <p>No tables created yet.</p>
          ) : (
            <ul>
              {tables.map((table) => (
                <li key={table._id}>
                  <Link to={`/tables/${table._id}`}>{table.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
