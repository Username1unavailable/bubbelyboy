import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Dynamically load the Nunito font from Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@500&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Function to check window width and set "isMobile" state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    // Check on initial render
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarStyle = {
    width: 'calc(100vw * 71 / 480)',
    height: '100vh',
    backgroundColor: '#f5f6fa',
    padding: '20px',
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: isMobile ? 'center' : 'start',  // Center icons for mobile
    position: 'fixed',
    top: 0,
    left: 0,
  };

  const navbarSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const navbarItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '18px',
    fontFamily: 'Nunito, sans-serif',
  };

  const navbarIconStyle = {
    width: '24px',
    height: '24px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    fontFamily: 'Nunito, sans-serif',
  };

  return (
    <div style={sidebarStyle}>
      <div style={navbarSectionStyle}>
        {/* If mobile view, only render icons. If desktop view, render icons with text */}
        <div style={navbarItemStyle}>
          <img src="./navlogos/explore.svg" alt="Explore" style={navbarIconStyle} />
          {!isMobile && <Link to="/" style={linkStyle}>Explore</Link>}
        </div>
        <div style={navbarItemStyle}>
          <img src="./navlogos/group.png" alt="Clubs" style={navbarIconStyle} />
          {!isMobile && <Link to="/clubs" style={linkStyle}>Clubs</Link>}
        </div>
        <div style={navbarItemStyle}>
          <img src="./navlogos/message.png" alt="Messages" style={navbarIconStyle} />
          {!isMobile && <Link to="/messages" style={linkStyle}>Messages</Link>}
        </div>
        <div style={navbarItemStyle}>
          <img src="./navlogos/message.png" alt="Saved Posts" style={navbarIconStyle} />
          {!isMobile && <Link to="/saved-posts" style={linkStyle}>Saved Posts</Link>}
        </div>
        <div style={navbarItemStyle}>
          <img src="./navlogos/settings.png" alt="Settings" style={navbarIconStyle} />
          {!isMobile && <Link to="/profile-settings" style={linkStyle}>Settings</Link>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
