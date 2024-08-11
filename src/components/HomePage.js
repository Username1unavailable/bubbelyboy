import React from 'react';
import { auth, googleProvider } from '../ firebase';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();

  const signOut = () => {
    auth.signOut().then(() => {
      navigate('/');
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Home Page</h1>
      <button onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default HomePage;