import React, { useEffect, useState } from 'react';
import { auth } from '../ firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, doc, getDoc, query, where, addDoc } from 'firebase/firestore';

const HomePage = () => {
  const [usernames, setUsernames] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('');  // Store the current user's ID
  const [currentUsername, setCurrentUsername] = useState('');  // State for current user's username
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    // Fetch the current user's username and UID
    const fetchCurrentUser = async () => {
      const user = auth.currentUser;
      if (user) {
        setCurrentUserId(user.uid);  // Store the current user ID
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const fallbackUsername = user.email.split('@')[0];
            setCurrentUsername(userData.username || fallbackUsername);
          } else {
            const fallbackUsername = user.email.split('@')[0];
            setCurrentUsername(fallbackUsername);
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
          return { username: userData.username || userData.email.split('@')[0], uid: doc.id };  // Store username and UID
        });
        setUsernames(usersList);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchCurrentUser();
    fetchUsernames();
  }, [db]);

  // Function to handle messaging a user
  const handleMessageUser = async (otherUserId) => {
    try {
      // Check if a chat already exists between the current user and the other user
      const q = query(
        collection(db, 'chats'),
        where('participants', 'array-contains', currentUserId)
      );
      const querySnapshot = await getDocs(q);
      let chatId = null;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.participants.includes(otherUserId)) {
          chatId = doc.id;  // Found an existing chat
        }
      });

      if (!chatId) {
        // Create a new chat if none exists
        const newChat = await addDoc(collection(db, 'chats'), {
          participants: [currentUserId, otherUserId],
        });
        chatId = newChat.id;
      }

      // Navigate to the messaging page with the chatId
      navigate(`/messages/${chatId}`);
    } catch (error) {
      console.error('Error creating or fetching chat:', error);
    }
  };

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
          {usernames.map((user, index) => (
            <li key={index}>
              {user.username}
              {user.uid !== currentUserId && (  // Prevent messaging yourself
                <button onClick={() => handleMessageUser(user.uid)}>
                  Message
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
