import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../ firebase';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const AuthCheck = () => {
  const [initialCheckDone, setInitialCheckDone] = useState(false);  // Track if initial loading has been done
  const navigate = useNavigate();
  const location = useLocation();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (!initialCheckDone) {
          // This block runs only when the user is authenticated for the first time
          setInitialCheckDone(true);  // Mark the initial check as done
          navigate('/loading');  // Show the loading screen initially

          // Check if user exists in Firestore, if not, add them with their default username (email prefix)
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (!userDoc.exists()) {
            const emailPrefix = user.email.split('@')[0]; // Default username from email
            try {
              await setDoc(userDocRef, { username: emailPrefix, email: user.email });
              console.log(`New user added: ${emailPrefix}`);
            } catch (error) {
              console.error('Error adding new user to Firestore:', error);
            }
          }

          // Redirect to home after the loading screen
          setTimeout(() => {
            navigate('/home');  // Redirect to home after loading screen
          }, 5000);  // Set your loading screen duration here
        }
      } else {
        // Redirect to landing page if not authenticated
        if (location.pathname !== '/') {
          navigate('/');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname, initialCheckDone, db]);

  return null;  // This component does not render anything
};

export default AuthCheck;
