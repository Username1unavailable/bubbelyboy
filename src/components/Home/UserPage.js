import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../../ firebase';

const UserPage = () => {
  const { emailPrefix } = useParams(); // Get the email prefix from the URL
  const [userData, setUserData] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Query to find the user by email prefix
        const usersQuery = query(
          collection(db, 'users'),
          where('email', '==', `${emailPrefix}@gmail.com`) // Adjust domain as necessary
        );
        const querySnapshot = await getDocs(usersQuery);
        
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUserData(userDoc.data());
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [emailPrefix, db]);

  return (
    <div style={{ padding: '20px' }}>
      {userData ? (
        <>
          <h1>{userData.username}'s Page</h1>
          <p>Email: {userData.email}</p>
          <img src={userData.profilePic} alt="Profile" />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserPage;
