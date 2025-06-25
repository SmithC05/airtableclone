import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./tables.css";
function TableViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [table, setTable] = useState(null);
  const [newRow, setNewRow] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editRowData, setEditRowData] = useState([]);
  const fetchTable = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/tables/${id}`, {
        withCredentials: true,
      });
      setTable(res.data.table);
      setNewRow(new Array(res.data.table.fields.length).fill(""));
    } catch (err) {
      console.error("Error fetching table:", err);
    }
  };
  useEffect(() => {
    fetchTable();
  }, [id]);
  const handleRowChange = (index, value) => {
    const updatedRow = [...newRow];
    updatedRow[index] = value;
    setNewRow(updatedRow);
  };
  const handleAddRow = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/tables/${id}/add-row`,
        { row: newRow },
        { withCredentials: true }
      );
      setTable(res.data.updatedTable);
      setNewRow(new Array(table.fields.length).fill(""));
    } catch (err) {
      console.error("Failed to add row:", err);
      alert("❌ Error adding row");
    }
  };
  const handleEditTable = async () => {
    const newName = prompt("Enter new table name:", table?.name);
    if (!newName || newName.trim() === "" || newName === table.name) return;

    try {
      await axios.put(`http://localhost:8000/api/v1/tables/${id}`, { name: newName }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("✅ Table renamed!");
      setTable({ ...table, name: newName });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to rename table");
    }
  };

  const handleDeleteTable = async () => {
    if (!window.confirm("Are you sure you want to delete this table?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/v1/tables/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("✅ Table deleted");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting table");
    }
  };

  const handleEditRow = (index) => {
    setEditRowIndex(index);
    setEditRowData([...table.rows[index]]);
  };

  const handleEditChange = (i, value) => {
    const updated = [...editRowData];
    updated[i] = value;
    setEditRowData(updated);
  };

  const submitRowUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/v1/tables/${id}/rows/${editRowIndex}`, {
        updatedRow: editRowData,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("✅ Row updated");
      setEditRowIndex(null);
      fetchTable();
    } catch (err) {
      console.error(err);
      alert("❌ Error updating row");
    }
  };

  const handleDeleteRow = async (index) => {
    if (!window.confirm("Are you sure you want to delete this row?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/v1/tables/${id}/rows/${index}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("🗑️ Row deleted");
      fetchTable();
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting row");
    }
  };
  if (!table) return <p>Loading...</p>;
  return (
    <div className="table-view-page">
       <div className="table-nav">
  <button onClick={() => navigate("/dashboard")} className="btn-dashboard">
    🏠 Go to Dashboard
  </button>
</div>
      <h2>{table.name} 📋</h2>
      <table className="custom-table">
        <thead>
          <tr>
            {table.fields.map((field, index) => (
              <th key={index}>{field.name}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {table.rows && table.rows.length > 0 ? (
            table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {editRowIndex === rowIndex ? (
                  row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <input
                        value={editRowData[cellIndex]}
                        onChange={(e) => handleEditChange(cellIndex, e.target.value)}
                      />
                    </td>
                  ))
                ) : (
                  row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))
                )}
                <td>
                  {editRowIndex === rowIndex ? (
                    <button onClick={submitRowUpdate}>✅</button>
                  ) : (
                    <button onClick={() => handleEditRow(rowIndex)}>✏️</button>
                  )}
                  <button onClick={() => handleDeleteRow(rowIndex)}>🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={table.fields.length + 1}>No data yet.</td>
            </tr>
          )}

          <tr>
  {table.fields.map((field, index) => {
    const typeMap = {
      phone: "tel",
      rating: "number",
      currency: "number",
      email: "email",
      url: "url",
      date: "date",
      number: "number",
      text: "text"
    };
    const inputType = typeMap[field.type] || "text";

    return (
      <td key={index}>
        {field.type === "checkbox" ? (
          <input
            type="checkbox"
            checked={newRow[index] === true}
            onChange={(e) => handleRowChange(index, e.target.checked)}
          />
        ) : field.type === "dropdown" ? (
          <select
            value={newRow[index] || ""}
            onChange={(e) => handleRowChange(index, e.target.value)}
          >
            <option value="">-- Select --</option>
            {field.options.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        ) : field.type === "currency" ? (
          <div className="currency-input">
    <span className="currency-symbol">₹</span>
    <input
      type="number"
      placeholder={field.name}
      value={newRow[index] ?? ""}
      onChange={(e) => handleRowChange(index, e.target.value)}
    />
  </div>
        ) : field.type === "rating" ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="number"
              min="0"
              max="10"
              placeholder={field.name}
              value={newRow[index] || ""}
              onChange={(e) => handleRowChange(index, e.target.value)}
              style={{ width: "100%" }}
            />
            <span style={{ marginLeft: "4px" }}>/10</span>
          </div>
        ) : (
          <input
            type={inputType}
            placeholder={field.name}
            value={newRow[index] || ""}
            onChange={(e) => handleRowChange(index, e.target.value)}
          />
        )}
      </td>
    );
  })}
  <td>
    <button onClick={handleAddRow}>➕ Add</button>
  </td>
</tr>

        </tbody>
      </table>

      <div className="table-actions">
        <button onClick={handleEditTable} className="btn-edit">✏️ Edit Table</button>
        <button onClick={handleDeleteTable} className="btn-delete">🗑️ Delete Table</button>
      </div>
      <div className="table-footer">
        <p>Total Rows: {table.rows.length}</p>
      </div>
    </div>
  );
}
export default TableViewPage;
