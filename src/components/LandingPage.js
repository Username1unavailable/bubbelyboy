import React from 'react';
import { auth, googleProvider } from '../ firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to My App</h1>
      <button onClick={signInWithGoogle}>
        Login with Google
      </button>
    </div>
  );
};

export default LandingPage;