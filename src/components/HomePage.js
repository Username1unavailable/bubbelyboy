import React, { useEffect, useState } from 'react';
import { auth } from '../ firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username || user.email.split('@')[0]);
        } else {
          setUsername(user.email.split('@')[0]);
        }
      }
    };

    fetchUsername();
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
        <h1>Hello {username}, welcome to Bubble</h1>
        <p>Scroll down to see more content...</p>
        {/* Add more content here to simulate a longer page */}
      </div>
    </div>
  );
};

export default HomePage;
