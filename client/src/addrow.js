import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './addrow.css'; 
function AddRowPage() {
  const { id } = useParams();
  const [table, setTable] = useState(null);
  const [rowData, setRowData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/tables/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setTable(res.data.table);
        const initialRow = {};
        res.data.table.fields.forEach(field => {
          initialRow[field.name] = "";
        });
        setRowData(initialRow);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching table:", err);
        alert("❌ Failed to fetch table");
      }
    };

    fetchTable();
  }, [id]);

  const handleChange = (e, field) => {
    const { value, checked, type } = e.target;
    setRowData(prev => ({
      ...prev,
      [field.name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/tables/${id}/rows`, {
        data: rowData
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      alert("✅ Row added successfully!");
      const cleared = {};
      table.fields.forEach(field => cleared[field.name] = "");
      setRowData(cleared);

    } catch (err) {
      console.error("Error saving row:", err);
      alert("❌ Failed to add row");
    }
  };

  if (loading) return <p>Loading table info...</p>;
  if (!table) return <p>Table not found</p>;

  return (
    <div className="add-row-page">
      <h2>Add Row to Table: {table.name}</h2>
      <form onSubmit={handleSubmit}>
        {table.fields.map((field, index) => (
          <div key={index} className="form-group">
            <label>{field.name}</label>
            {field.type === "dropdown" ? (
              <select
                value={rowData[field.name]}
                onChange={(e) => handleChange(e, field)}
                required={field.required}
              >
                <option value="">-- select --</option>
                {field.options.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <input
                type="checkbox"
                checked={rowData[field.name]}
                onChange={(e) => handleChange(e, field)}
              />
            ) : (
              <input
                type={field.type}
                value={rowData[field.name]}
                onChange={(e) => handleChange(e, field)}
                required={field.required}
              />
            )}
          </div>
        ))}
        <button type="submit">➕ Add Row</button>
      </form>
    </div>
  );
}

export default AddRowPage;
