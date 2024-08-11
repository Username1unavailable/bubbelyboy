import React, { useState } from 'react';
import { auth } from '../ firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Navbar from './Navbar';

const ProfileSettings = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const db = getFirestore();

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'users', user.uid), { username });
        console.log('Username saved:', username);
      }
    } catch (error) {
      console.error('Error saving username:', error);
    }
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Profile Settings</h1>
        <input 
          type="text" 
          placeholder="Enter your username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <button onClick={handleSave}>
          Save Username
        </button>
        <button onClick={handleSignOut} style={{ marginLeft: '10px' }}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;