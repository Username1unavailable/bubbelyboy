import React from 'react';
import { motion } from 'framer-motion';

const ScrollToLearnMore = () => {
  return (
    <div style={styles.container}>
      <motion.div
        style={styles.textContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } }}
      >
        <h2 style={styles.text}>SCROLL TO LEARN MORE</h2>
        <img
          src="./Arrow.png"
          alt="Scroll down"
          style={styles.squigglyImage}
         
        />
      </motion.div>

      <motion.img
        src="./group.png"
        alt="Profile pics"
        style={styles.profileImages}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8 } }}
      />
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    position: 'relative',
  },
  textContainer: {
    position: 'relative',
    zIndex: 2,
  },
  text: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold',
    fontSize: '12px', // Adjust size as needed
    marginBottom: '10px',
  },
  squigglyImage: {
    width: '100px', // Adjust size as needed
    margin: '0 auto',
    marginBottom: '100px',
  },
  profileImages: {
    position: 'absolute',
    top: '200px', // Adjust to position it correctly
    left: '0',
    right: '0',
    zIndex: 1,
    width: '100%',
    height: 'auto',
  },
};

export default ScrollToLearnMore;