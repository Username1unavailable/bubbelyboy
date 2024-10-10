import React, { useEffect, useState, useRef } from 'react';
import { getFirestore, collection, addDoc, query, where, onSnapshot, doc, getDoc, orderBy } from 'firebase/firestore';
import { auth } from '../../ firebase';
import { useParams } from 'react-router-dom';
import './Messages.css';

const MessagesComponent = ({ chatId, onExit }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatUser, setChatUser] = useState('');
  const db = getFirestore();
  const chatRef = useRef(null);

  useEffect(() => {
    const messagesQuery = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesList);
      chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

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
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>{chatUser}</h2>
        <button onClick={onExit} className="exit-button">Exit</button>
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
        <div ref={chatRef} />
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
