import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css'; 
function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));


  return (
    <div className="page">
        <div className="avatar-circle">{user?.name?.charAt(0)}</div>
        <Link to="/dashboard" className="go-dashboard">🏠 Go to Dashboard</Link>
      <h2>👤 Welcome back, {user?.name || "User"}!</h2>
      <p>✨ You haven’t completed your profile yet.</p>
      <p>💡 Profile features coming soon...</p>
    </div>
    
  );
}

export default ProfilePage;
