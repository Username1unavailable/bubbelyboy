import React, { useState } from 'react';
import { auth, googleProvider } from '../../ firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation variants for motion
const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, delay: 0.2 },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    backgroundColor: '#fff',
    color: '#0000FF',
    outline: '2px solid #0000FF',
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
};

const imageVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity },
  },
};

const MainContent = () => {
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
    <motion.div
      style={styles.container}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.p style={styles.subtitle} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }}>
        Bring Everyone Back Together
      </motion.p>
      
      <motion.h1 style={styles.title} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.8 } }}>
        Where content creators share <br />
        memorable moments with friends.
         <img src={'./scribble.png'} alt="Scribble" style={styles.scribble} />
      </motion.h1>
      <h1></h1>
      <motion.button
        style={styles.button}
        onClick={signInWithGoogle}
        variants={buttonVariants}
        whileHover="hover"
      >
        Join Now
      </motion.button>

      <motion.div style={styles.logoContainer}>
        <motion.img
          src="./google.png"
          alt="Google"
          width="150px"
          style={styles.logo}
          variants={imageVariants}
          initial="initial"
          animate="animate"
        />
        <motion.img
          src="./app1.png"
          alt="App"
          width="150px"
          style={{ ...styles.logo, marginLeft: '10px' }}
          variants={imageVariants}
          initial="initial"
          animate="animate"
        />
      </motion.div>
    </motion.div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px 20px',
    position: 'relative',
    overflow: 'hidden',
  },
  subtitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '18px',
    color: '#3A45F3',
    fontWeight: 'bold',
    marginBottom: '0px',
    transform: 'translateY(70%)',
  },
  title: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '48px',
    color: '#000',
    fontWeight: 'normal',
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
    marginTop: '-40px',
    padding: '20px 60px',
    backgroundColor: '#0000FF',
    color: '#fff',
    border: 'none',
    borderRadius: '24px',
    fontSize: '24px',
    cursor: 'pointer',
    fontWeight: 'medium',
    transition: 'all 0.3s ease',
  },
  logoContainer: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    pointerEvents: 'none',
  },
};

export default MainContent;
