import React, { useState } from 'react';
import { auth, googleProvider } from '../../ firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/loading');  // Navigate to the loading screen after login
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div style={styles.topBar}>
      <div style={styles.logoContainer}>
        <img 
          id="logoImage" 
          src="./bub.png" 
          alt="Logo" 
          width="150px" 
          style={{ pointerEvents: 'none' }}
        />
      </div>
      <div style={styles.loginContainer}>
        <button 
          style={{
            ...styles.button,
            backgroundColor: isHovered ? '#fff' : '#0000FF',
            color: isHovered ? '#0000FF' : '#fff',
            outline: isHovered ? '2px solid #0000FF' : 'none',
          }}
          onClick={signInWithGoogle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

const styles = {
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 10px',
    backgroundColor: '#fdfffe',

    position: 'relative', // Ensure the zIndex works
  },
  logoContainer: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    textAlign: 'right',
  },
  button: {
    padding: '10px 20px',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#0000FF',
    color: '#fff',
    border: 'none',
    borderRadius: '8.37px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '12px',
  }
};

export default TopBar;
