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
          navigate('/home');  // Redirect only from the landing or loading pages
        }
      } else {
        if (location.pathname !== '/') {
          navigate('/');  // Redirect to landing page if not authenticated
        }
      }
    });

    return () => unsubscribe();  // Cleanup subscription on unmount
  }, [navigate, location.pathname]);

  return null;  // This component does not render anything
};

export default AuthCheck;