import React, { useEffect, useRef, useState } from 'react';
import { auth, googleProvider } from '../../ firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  /*
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bubbles = [];
    const colors = ['#206cff', '#538af9']; // Uniform color for all bubbles
    const bubbleRadius = ['80', '60'];        // Uniform radius for all bubbles
  
    // Set canvas dimensions to window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth+1500;
      canvas.height = window.innerHeight ;
      ctx.scale(1, 1); // Ensure no scaling distortion
    };
  
    setCanvasSize();
  
    class Bubble {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height/2;
        this.radius = bubbleRadius[Math.floor(Math.random() * bubbleRadius.length)]; 
        this.dx = Math.random() * 2 - 1;
        this.dy = Math.random() * 2 - 1;
        this.color = colors[Math.floor(Math.random() * colors.length)]; 
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }
  
      update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }
  
    function init() {
      for (let i = 0; i < 20; i++) {
        bubbles.push(new Bubble());
      }
    }
  
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach((bubble) => bubble.update());
    }
  
    init();
    animate();
  
    window.addEventListener('resize', () => {
      setCanvasSize();  // Reset canvas size on window resize
    });
  }, []);
  */

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