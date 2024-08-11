import React, { useEffect, useState } from 'react';
import { auth } from '../ firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Navbar from './Navbar';

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

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Hello {username}, welcome to Bubble</h1>
      </div>
    </div>
  );
};

export default HomePage;