import React, { useEffect, useState } from "react";
import './dashboard.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/tables", {
      withCredentials: true
    }).then((res) => {
      setTables(res.data.tables);
    }).catch((err) => {
      console.error("Error fetching tables:", err);
    });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this table?")) return;

    axios.delete(`http://localhost:8000/api/v1/tables/${id}`, {
      withCredentials: true
    }).then(() => {
      setTables(prev => prev.filter(t => t._id !== id));
    }).catch(err => {
      alert("❌ Failed to delete table");
      console.error(err);
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2 className="dashboard-heading">Welcome Back 👋</h2>

        <div className="dashboard-buttons">
          <Link to="/create" className="dashboard-btn">+ New Table</Link>
          <Link to="/profile" className="dashboard-btn">👤 Profile</Link>
          <Link to="/logout" className="dashboard-btn logout-btn">🚪 Logout</Link>
        </div>

        <div className="dashboard-grid-wrapper">
          <h3 className="tables-heading">Your Tables 📋</h3>
          {tables.length === 0 ? (
            <p>No tables created yet.</p>
          ) : (
            <div className="dashboard-grid">
              {tables.map((table) => (
                <div key={table._id} className="table-card">
                  <div className="table-name">{table.name}</div>
                  <div className="card-actions">
                    <Link to={`/tables/${table._id}`} className="view-btn">
                      View
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(table._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
