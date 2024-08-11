import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e7e7e7' }}>
      <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
      <Link to="/profile-settings">Profile Settings</Link>
    </nav>
  );
};

export default Navbar;