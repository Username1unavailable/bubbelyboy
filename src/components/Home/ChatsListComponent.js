import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, onSnapshot, getDoc, doc } from 'firebase/firestore';  // Add getDoc and doc
import { auth } from '../../ firebase';
import { useNavigate } from 'react-router-dom';
import './ChatsList.css';  // Add a CSS file for styles
import MessagesComponent from './messages'; // Import MessagesComponent

const ChatsListComponent = () => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null); // State to track the active chat
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const chatsQuery = query(collection(db, 'chats'), where('participants', 'array-contains', auth.currentUser.uid));
    const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
      const chatList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setChats(chatList);
    });

    return () => unsubscribe();
  }, [db]);

  const handleChatClick = (chatId) => {
    setActiveChatId(chatId); // Set the active chat ID
  };

  const handleExit = () => {
    setActiveChatId(null); // Reset active chat ID to close the chat
  };

  return (
    <div className="chats-list-container">
      {activeChatId ? (
        <MessagesComponent chatId={activeChatId} onExit={handleExit} /> // Render MessagesComponent if active chat
      ) : (
        <>
          <h2>Chats</h2>
          <ul className="chats-list">
            {chats.map((chat) => (
              <li key={chat.id} className="chat-item" onClick={() => handleChatClick(chat.id)}>
                {/* Show only the name for now */}
                {chat.participants.filter((uid) => uid !== auth.currentUser.uid).map((uid) => (
                  <ChatUserName key={uid} uid={uid} />
                ))}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const ChatUserName = ({ uid }) => {
  const [username, setUsername] = useState('');
  const db = getFirestore();

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = await getDoc(doc(db, 'users', uid));  // Fetch the user document
      if (userDoc.exists()) {
        setUsername(userDoc.data().username || userDoc.data().email.split('@')[0]);  // Set the username or fallback to email
      }
    };
    fetchUser();
  }, [uid, db]);

  return <span>{username}</span>;
};

export default ChatsListComponent;
