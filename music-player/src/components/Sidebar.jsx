import React from "react";
import { Link } from "react-router-dom"; // Router ilə əlaqə qurmaq üçün

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-item">Home</Link>
      <Link to="/albums" className="sidebar-item">Albums</Link>
      <Link to="/artists" className="sidebar-item">Artists</Link>
    </div>
  );
}

export default Sidebar;
