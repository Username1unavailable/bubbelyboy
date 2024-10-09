import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';  // Import your existing Navbar

const Layout = () => {
  // Flexbox layout for Navbar and page content
  const layoutStyle = {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',  // Full height of the viewport
  };

  const mainContentStyle = {
   
    flex: 1,           // Take up remaining space after the Navbar
    overflowY: 'auto',
   // Allow the main content to scroll
  };

  return (
    <div style={layoutStyle}>
      <Navbar />
      <div style={mainContentStyle}>
        <Outlet />  {/* This will render the child components, e.g., HomePage, ProfileSettings */}
      </div>
    </div>
  );
};

export default Layout;
