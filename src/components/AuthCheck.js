import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../ firebase';

const AuthCheck = () => {
  const [initialCheckDone, setInitialCheckDone] = useState(false);  // Track if initial loading has been done
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (!initialCheckDone) {
          // This block runs only when the user is authenticated for the first time
          setInitialCheckDone(true);  // Mark the initial check as done
          navigate('/loading');  // Show the loading screen initially
          setTimeout(() => {
            navigate('/home');  // Redirect to home after the loading screen
          }, 5000);  // Set your loading screen duration here
        }
        // If the user is authenticated and the initial loading has been done, no need for further actions
      } else {
        // Redirect to landing page if not authenticated
        if (location.pathname !== '/') {
          navigate('/');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname, initialCheckDone]);

  return null;  // This component does not render anything
};

export default AuthCheck;