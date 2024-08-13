import React, { useEffect, useRef, useState } from 'react';
import { auth, googleProvider } from '../../ firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";


const MainContent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

 

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/loading');  // Navigate to the loading screen after login
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    
    <div style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas}></canvas>
      <p style={styles.subtitle}>Bring Everyone Back Together</p>
      <h1 style={styles.title}>
      Where content creators share <br />
      memorable moments with friends.
        <img src={'./scribble.png'} alt="Scribble" style={styles.scribble} />
      </h1>
      <h1>
      </h1>
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
      <h1>
      </h1>
      
      <img 
          id="logoImage" 
          src="./google.png" 
          alt="Logo" 
          width="150px" 
          style={{ pointerEvents: 'none', marginTop:'0px' }}
        />

        <img 
          id="logoImage" 
          src="./app1.png" 
          alt="Logo" 
          width="150px" 
          style={{ pointerEvents: 'none', marginLeft:'10px'}}
          
        />
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px 20px',
    position: 'relative',
    overflow: 'hidden',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  subtitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '18px',
    color: '#3A45F3',
    fontWeight: 'bold',
    marginBottom: '0px',
    transform: 'translatey(70%)',
  },
  title: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '48px',
    color: '#000',
    fontWeight: 'Normal',
    lineHeight: '1.2',
    position: 'relative',
    display: 'inline-block',
  },
  scribble: {
    position: 'absolute',
    bottom: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '259px',
    height: '23.31px',
  },
  button: {
    marginTop: '0px',
    padding: '20px 60px',
    backgroundColor: '#0000FF',
    transform: 'translatey(-50%)',
    color: '#fff',
    border: 'none',
    borderRadius: '24px',
    fontSize: '24px',
    cursor: 'pointer',
    fontWeight: 'Medium',
    transition: 'all 0.3s ease',
  },
};

export default MainContent;