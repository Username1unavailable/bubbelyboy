import React, { useEffect, useState, useRef } from 'react';
import { getFirestore, collection, addDoc, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { auth } from '../../ firebase';
import { useParams } from 'react-router-dom';
import './Messages.css';  // Add a CSS file for styles

const MessagesComponent = () => {
  const { chatId } = useParams();  // Get the chatId from the URL params
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatUser, setChatUser] = useState('');  // To store the chat recipient's name
  const db = getFirestore();
  const chatRef = useRef(null);  // Reference to the chat container for auto-scrolling

  useEffect(() => {
    // Listen to messages in the current chat
    const messagesQuery = query(collection(db, `chats/${chatId}/messages`));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesList);
      // Scroll to the bottom when a new message arrives
      chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    // Fetch chat participant's name
    const fetchChatUser = async () => {
      const chatDoc = await getDoc(doc(db, 'chats', chatId));
      if (chatDoc.exists()) {
        const participants = chatDoc.data().participants;
        const otherUserId = participants.find((id) => id !== auth.currentUser.uid);
        const otherUserDoc = await getDoc(doc(db, 'users', otherUserId));
        if (otherUserDoc.exists()) {
          setChatUser(otherUserDoc.data().username || otherUserDoc.data().email.split('@')[0]);
        }
      }
    };

    fetchChatUser();
    return () => unsubscribe();
  }, [chatId, db]);

  const handleSendMessage = async () => {
    const user = auth.currentUser;
    if (user && newMessage.trim()) {
      await addDoc(collection(db, `chats/${chatId}/messages`), {
        text: newMessage,
        senderId: user.uid,
        timestamp: new Date(),
      });
      setNewMessage('');  // Clear input
    }
  };

  return (
    <div className="chat-container" style={{marginLeft: 'calc(100vw * 71 / 480)',}}>
      <div className="chat-header">
        <h2>{chatUser}</h2>
      </div>
      <div className="messages-list">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message-bubble ${message.senderId === auth.currentUser.uid ? 'my-message' : 'other-message'}`}
          >
            {message.text}
          </div>
        ))}
        <div ref={chatRef} />  {/* Auto scroll reference */}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default MessagesComponent;
