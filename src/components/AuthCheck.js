import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../ firebase';

const AuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (location.pathname === '/' || location.pathname === '/loading') {
          navigate('/loading');  // Redirect to loading screen first
        }
      } else {
        if (location.pathname !== '/') {
          navigate('/');  // Redirect to landing page if not authenticated
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return null;  // This component does not render anything
};

export default AuthCheck;
