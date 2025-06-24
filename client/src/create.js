import  { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import './create.css';
const fieldTypes = [
  "text", "number", "date", "dropdown", "checkbox",
  "email", "phone", "url", "rating", "currency"
];
function CreatePage() {
  const navigate = useNavigate();
  const [tableName, setTableName] = useState("");
  const [fields, setFields] = useState([
    { name: "", type: "text", required: false, options: [] }
  ]);
  const [errors, setErrors] = useState([]);
  const addField = () => {
    setFields([...fields, { name: "", type: "text", required: false, options: [] }]);
    setErrors([...errors, ""]);
  };
  const removeField = (index) => {
    const updatedFields = [...fields];
    const updatedErrors = [...errors];
    updatedFields.splice(index, 1);
    updatedErrors.splice(index, 1);
    setFields(updatedFields);
    setErrors(updatedErrors);
  };
  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    if (key === "type" && value !== "dropdown") {
      updatedFields[index].options = [];
    }
    setFields(updatedFields);
  };
  const handleDropdownOptionChange = (index, value) => {
    const options = value
      .split(',')
      .map((opt) => opt.trim())
      .filter((opt) => opt);
    handleFieldChange(index, "options", options);
  };
  const handleValidation = () => {
    let isValid = true;
    let newErrors = [];
    fields.forEach((field, index) => {
      let error = "";
      if (!field.name.trim()) {
        error = "Field name is required";
        isValid = false;
      } else if (field.type === "dropdown" && (!field.options || field.options.length === 0)) {
        error = "Dropdown must have at least 1 option";
        isValid = false;
      }
      newErrors[index] = error;
    });
    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async () => {
    if (!tableName.trim()) {
      return alert("⚠️ Table name is required");
    }
    if (!handleValidation()) {
      return alert("⚠️ Please fix validation errors in fields.");
    }
    try {
      const payload = {
        name: tableName,
        fields: fields.map(({ name, type, required, options }) => ({
          name,
          type,
          required,
          options: type === "dropdown" ? options : []
        }))
      };
      const res = await axios.post("http://localhost:8000/api/v1/tables", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const tableId = res.data.table._id;
      alert("✅ Table created successfully!");
      setTableName("");
      setFields([{ name: "", type: "text", required: false, options: [] }]);
      setErrors([]);
      navigate(`/tables/${tableId}`); 
    } catch (err) {
      console.error(err);
      alert("❌ Error creating table");
    }
  };
  return (
    <div className="create-page">
      <Link to="/dashboard" className="go-dashboard">🏠 Go to Dashboard</Link>
      <h2>Create New Table</h2>
      <input
        type="text"
        placeholder="Enter table name..."
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
      />
      <h3>Fields</h3>
      {fields.map((field, index) => (
        <div key={index} className="field-box">
          <input
            type="text"
            placeholder="Field Name"
            value={field.name}
            onChange={(e) => handleFieldChange(index, "name", e.target.value)}
          />
          <select
            value={field.type}
            onChange={(e) => handleFieldChange(index, "type", e.target.value)}
          >
            {fieldTypes.map((type) => (
              <option value={type} key={type}>{type}</option>
            ))}
          </select>
          {field.type === "dropdown" && (
            <input
              type="text"
              placeholder="Dropdown options (comma-separated)"
              onChange={(e) => handleDropdownOptionChange(index, e.target.value)}
            />
          )}
          <label>
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => handleFieldChange(index, "required", e.target.checked)}
            />
            Required
          </label>
          {fields.length > 1 && (
            <button onClick={() => removeField(index)}>❌</button>
          )}
          {errors[index] && (
            <p className="error">{errors[index]}</p>
          )}
        </div>
      ))}
      <button onClick={addField}>➕ Add Field</button>
      <br /><br />
      <button onClick={handleSubmit}>🚀 Create Table</button>
    </div>
  );
}
export default CreatePage;
