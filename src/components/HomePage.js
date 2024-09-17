import React, { useEffect, useState } from 'react';
import { auth } from '../ firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const HomePage = () => {
  const [usernames, setUsernames] = useState([]);
  const [currentUsername, setCurrentUsername] = useState('');  // State for current user's username
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    // Fetch the current user's username
    const fetchCurrentUser = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Fetch the current user's document from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // If a username is already set in Firestore, use it, otherwise default to email username
            const fallbackUsername = user.email.split('@')[0];
            setCurrentUsername(userData.username || fallbackUsername);
          } else {
            const fallbackUsername = user.email.split('@')[0];
            setCurrentUsername(fallbackUsername); // Default to email username if no document exists
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      }
    };

    // Fetch all users from Firestore and handle those without custom usernames
    const fetchUsernames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map((doc) => {
          const userData = doc.data();
          // If no custom username, use the email prefix
          return userData.username || userData.email.split('@')[0];
        });
        setUsernames(usersList);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchCurrentUser();
    fetchUsernames();
  }, [db]);

  // Flexbox layout to align Navbar and the main content side by side
  const layoutStyle = {
    display: 'flex',
    flexDirection: 'row',  // Align Navbar and content side by side
    height: '100vh',       // Ensure the height of the layout is 100% of the viewport
  };

  const mainContentStyle = {
    padding: '20px',
    flex: 1,               // Take up the remaining space on the right
    overflowY: 'auto',      // Allow the main content to scroll
    textAlign: 'center',
    marginLeft: 'calc(100vw * 71 / 480)',  // Ensure content starts after the navbar
  };

  return (
    <div style={layoutStyle}>
      <div style={mainContentStyle}>
        <h1>Hello {currentUsername}, welcome to Bubble</h1> {/* Personalized greeting */}
        <p>Scroll down to see more content...</p>
        <h2>List of Users:</h2>
        <ul>
          {usernames.map((username, index) => (
            <li key={index}>{username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
