import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../ firebase';

// Dynamically load the Nunito font from Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@500&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState({ username: '', email: '', profilePic: '../assets/default-profile.png' });
  const location = useLocation(); // Get current route path

  // Function to check window width and set "isMobile" state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1300);
    };

    // Check on initial render
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    const fetchUserData = () => {
      const user = auth.currentUser;
      if (user) {
        const fallbackUsername = user.email.split('@')[0];
        setUserData({
          username: user.displayName || fallbackUsername,
          email: user.email,
          profilePic: user.photoURL || '../assets/default-profile.png',
        });
      }
    };
    fetchUserData();
  }, []);

  const sidebarStyle = {
    width: 'calc(100vw * 90/480)',
    height: '100vh',
    backgroundColor: 'white',
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
    width: '100%', 
    
   
   // Make sure items take full width
  };

  const navbarItemStyle = {
    display: 'flex',
    justifyContent: 'center',  // Center the entire content
    alignItems: 'center',  // Vertically center the content
    fontSize: 'calc(100vh * 20/982)',
    fontFamily: 'Nunito, sans-serif',
    width: '100%', 
     // Ensure each item covers the full width
    padding: 'calc(100vh * 20/982)',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    transition: 'background-color 0.3s ease',
  };
  
  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: isActive(path) ? '#0057FF' : 'black',  // Change text color to blue when active
    fontWeight: 'bold',
    fontFamily: 'Nunito, sans-serif',
    display: 'flex',         // Ensure the icon and text are flexed together
    flexDirection: 'column',  // Stack SVG and text vertically
    justifyContent: 'center', // Center both SVG and text horizontally
    alignItems: 'center',     // Center both vertically
    width: '50%',            // Ensure it stretches across the button
  });
  
  
  
  

  const navbarItemHoverStyle = {
    ...navbarItemStyle,
    backgroundColor: '#e0e0e0',  // Change background color on hover
  };

  // Check if the current location matches the link
  const isActive = (path) => location.pathname === path;

  return (
    <div style={sidebarStyle}>
      
      <div style={navbarSectionStyle}>
      <Link to="/home" style={{ textDecoration: 'none' }}>
      <div
          style={navbarItemStyle}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        >
         
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="calc(100vw * 65/982)"
              height="calc(100vh * 65/1512)"
              viewBox="0 0 24 24"
              fill={isActive('/home') ? '#0057FF' : 'black'} 
            >
              <path d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z" />
            </svg>
         
          {!isMobile && <Link to="/home" style={linkStyle('/home')}>Explore</Link>}
        </div>
        </Link>
        


        <Link to="/clubs" style={{ textDecoration: 'none' }}>
        <div
          style={navbarItemStyle}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        >
          <Link to="/clubs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="calc(100vw * 65/982)"
              height="calc(100vh * 65/1512)"
              viewBox="0 0 24 24"
              fill={isActive('/clubs') ? '#0057FF' : 'black'}
            >
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1583 8.23285C16.1583 10.5825 14.2851 12.4666 11.949 12.4666C9.61292 12.4666 7.73974 10.5825 7.73974 8.23285C7.73974 5.88227 9.61292 4 11.949 4C14.2851 4 16.1583 5.88227 16.1583 8.23285ZM11.949 20C8.51785 20 5.58809 19.456 5.58809 17.2802C5.58809 15.1034 8.49904 14.5396 11.949 14.5396C15.3802 14.5396 18.31 15.0836 18.31 17.2604C18.31 19.4362 15.399 20 11.949 20ZM17.9571 8.30922C17.9571 9.50703 17.5998 10.6229 16.973 11.5505C16.9086 11.646 16.9659 11.7748 17.0796 11.7946C17.2363 11.8216 17.3984 11.8369 17.5631 11.8414C19.2062 11.8846 20.6809 10.821 21.0883 9.21974C21.6918 6.84123 19.9198 4.7059 17.6634 4.7059C17.4181 4.7059 17.1835 4.73201 16.9551 4.77884C16.9238 4.78605 16.8907 4.80046 16.8728 4.82838C16.8513 4.8626 16.8674 4.90853 16.8889 4.93825C17.5667 5.8938 17.9571 7.05918 17.9571 8.30922ZM20.6782 13.5126C21.7823 13.7296 22.5084 14.1727 22.8093 14.8166C23.0636 15.3453 23.0636 15.9586 22.8093 16.4864C22.349 17.4851 20.8654 17.8058 20.2887 17.8886C20.1696 17.9066 20.0738 17.8031 20.0864 17.6833C20.3809 14.9157 18.0377 13.6035 17.4315 13.3018C17.4055 13.2883 17.4002 13.2676 17.4028 13.255C17.4046 13.246 17.4154 13.2316 17.4351 13.2289C18.7468 13.2046 20.1571 13.3847 20.6782 13.5126ZM6.43711 11.8413C6.60186 11.8368 6.76304 11.8224 6.92063 11.7945C7.03434 11.7747 7.09165 11.6459 7.02718 11.5504C6.4004 10.6228 6.04313 9.50694 6.04313 8.30913C6.04313 7.05909 6.43353 5.89371 7.11135 4.93816C7.13284 4.90844 7.14806 4.86251 7.12746 4.82829C7.10956 4.80127 7.07553 4.78596 7.04509 4.77875C6.81586 4.73192 6.58127 4.70581 6.33593 4.70581C4.07951 4.70581 2.30751 6.84114 2.91191 9.21965C3.31932 10.8209 4.79405 11.8845 6.43711 11.8413ZM6.59694 13.2545C6.59962 13.268 6.59425 13.2878 6.56918 13.3022C5.9621 13.6039 3.61883 14.9161 3.91342 17.6827C3.92595 17.8034 3.83104 17.9061 3.71195 17.889C3.13531 17.8061 1.65163 17.4855 1.19139 16.4867C0.936203 15.9581 0.936203 15.3457 1.19139 14.817C1.49225 14.1731 2.21752 13.73 3.32156 13.512C3.84358 13.385 5.25294 13.2049 6.5656 13.2292C6.5853 13.2319 6.59515 13.2464 6.59694 13.2545Z"/>
            </svg>
          </Link>
          {!isMobile && <Link to="/clubs" style={linkStyle("/clubs")}>Clubs</Link>}
        </div>
        </Link>






        <Link to="/messages" style={{ textDecoration: 'none' }}>
        <div
          style={navbarItemStyle}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        >
          <Link to="/messages">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="calc(100vw * 65/982)"
              height="calc(100vh * 65/1512)"
              viewBox="0 0 24 24"
              fill={isActive('/messages') ? '#0057FF' : 'black'}
            >
              <path fill-rule="evenodd" clip-rule="evenodd"  d="M2 12.015C2 6.74712 6.21 2 12.02 2C17.7 2 22 6.65699 22 11.985C22 18.1642 16.96 22 12 22C10.36 22 8.54 21.5593 7.08 20.698C6.57 20.3876 6.14 20.1572 5.59 20.3375L3.57 20.9384C3.06 21.0986 2.6 20.698 2.75 20.1572L3.42 17.9139C3.53 17.6034 3.51 17.2729 3.35 17.0125C2.49 15.4301 2 13.6975 2 12.015ZM10.7 12.015C10.7 12.7261 11.27 13.2969 11.98 13.307C12.69 13.307 13.26 12.7261 13.26 12.025C13.26 11.314 12.69 10.7431 11.98 10.7431C11.28 10.7331 10.7 11.314 10.7 12.015ZM15.31 12.025C15.31 12.7261 15.88 13.307 16.59 13.307C17.3 13.307 17.87 12.7261 17.87 12.025C17.87 11.314 17.3 10.7431 16.59 10.7431C15.88 10.7431 15.31 11.314 15.31 12.025ZM7.37 13.307C6.67 13.307 6.09 12.7261 6.09 12.025C6.09 11.314 6.66 10.7431 7.37 10.7431C8.08 10.7431 8.65 11.314 8.65 12.025C8.65 12.7261 8.08 13.2969 7.37 13.307Z" />
            </svg>
          </Link>
          {!isMobile && <Link to="/messages" style={linkStyle("/messages")}>Messages</Link>}
        </div>
        </Link>





        <Link to="/saved-posts" style={{ textDecoration: 'none' }}>
        <div
          style={navbarItemStyle}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        >
          <Link to="/saved-posts" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="calc(100vw * 65/982)"
              height="calc(100vh * 65/1512)"
              viewBox="0 0 24 24"
              fill={isActive('/saved-posts') ? '#0057FF' : 'black'}
            >
              <path d="M12 21.35l-1.45-1.32c-5.4-4.95-9-8.47-9-12.24 0-3.39 2.7-6.13 6.13-6.13 1.76 0 3.44.76 4.61 2.03 1.17-1.27 2.85-2.03 4.61-2.03 3.43 0 6.13 2.74 6.13 6.13 0 3.77-3.6 7.29-9 12.24l-1.45 1.32z" />
            </svg>
          </Link>
          {!isMobile && <Link to="/saved-posts" style={linkStyle("/saved-posts")}>Saved Posts</Link>}
        </div>
       </Link>




       <Link to="/profile-settings" style={{ textDecoration: 'none' }}>

        <div
          style={navbarItemStyle}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        >
          <Link to="/profile-settings" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="calc(100vw * 65/982)"
              height="calc(100vh * 65/1512)"
              viewBox="0 0 24 24"
              fill={isActive('/profile-settings') ? '#0057FF' : 'black'}
            >
              <path d="M20.4023 13.58C20.76 13.77 21.036 14.07 21.2301 14.37C21.6083 14.99 21.5776 15.75 21.2097 16.42L20.4943 17.62C20.1162 18.26 19.411 18.66 18.6855 18.66C18.3278 18.66 17.9292 18.56 17.6022 18.36C17.3365 18.19 17.0299 18.13 16.7029 18.13C15.6911 18.13 14.8429 18.96 14.8122 19.95C14.8122 21.1 13.872 22 12.6968 22H11.3069C10.1215 22 9.18125 21.1 9.18125 19.95C9.16081 18.96 8.31259 18.13 7.30085 18.13C6.96361 18.13 6.65702 18.19 6.40153 18.36C6.0745 18.56 5.66572 18.66 5.31825 18.66C4.58245 18.66 3.87729 18.26 3.49917 17.62L2.79402 16.42C2.4159 15.77 2.39546 14.99 2.77358 14.37C2.93709 14.07 3.24368 13.77 3.59115 13.58C3.87729 13.44 4.06125 13.21 4.23498 12.94C4.74596 12.08 4.43937 10.95 3.57071 10.44C2.55897 9.87 2.23194 8.6 2.81446 7.61L3.49917 6.43C4.09191 5.44 5.35913 5.09 6.38109 5.67C7.27019 6.15 8.425 5.83 8.9462 4.98C9.10972 4.7 9.20169 4.4 9.18125 4.1C9.16081 3.71 9.27323 3.34 9.4674 3.04C9.84553 2.42 10.5302 2.02 11.2763 2H12.7172C13.4735 2 14.1582 2.42 14.5363 3.04C14.7203 3.34 14.8429 3.71 14.8122 4.1C14.7918 4.4 14.8838 4.7 15.0473 4.98C15.5685 5.83 16.7233 6.15 17.6226 5.67C18.6344 5.09 19.9118 5.44 20.4943 6.43L21.179 7.61C21.7718 8.6 21.4447 9.87 20.4228 10.44C19.5541 10.95 19.2475 12.08 19.7687 12.94C19.9322 13.21 20.1162 13.44 20.4023 13.58ZM9.10972 12.01C9.10972 13.58 10.4076 14.83 12.0121 14.83C13.6165 14.83 14.8838 13.58 14.8838 12.01C14.8838 10.44 13.6165 9.18 12.0121 9.18C10.4076 9.18 9.10972 10.44 9.10972 12.01Z"/>
            </svg>
          </Link>
          {!isMobile && <Link to="/profile-settings" style={linkStyle("/profile-settings")}>Settings</Link>}
        </div>
        </Link>








        <Link to="/user-page" style={{ textDecoration: 'none', paddingTop: '80px' }}>
          <div
            style={navbarItemStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
          >
            <img
              src={userData.profilePic}
              alt="Profile"
              style={{
                width:"45px",
                height:"45px",
                borderRadius: '50%',
                marginRight: isMobile ? '0' : '10px',
              }}
            />
            {!isMobile && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', color: 'black' }}>{userData.username}</div>
                <div style={{ color: '#6b6b6b' }}>@{userData.email.split('@')[0]}</div>
              </div>
            )}
          </div>
        </Link>




      </div>
    </div>
  );
};

export default Navbar;
