import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../ firebase';

const AuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
