import React, { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { auth } from '../../ firebase';
import { useParams } from 'react-router-dom';

const MessagesComponent = () => {
  const { chatId } = useParams();  // Get the chatId from the URL params
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const db = getFirestore();

  useEffect(() => {
    // Listen to messages in the current chat
    const messagesQuery = query(collection(db, `chats/${chatId}/messages`));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesList);
    });

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
    <div style={{marginLeft: 'calc(100vw * 90 / 480)',}}>
      <h2>Chat</h2>
      <div>
        {messages.map((message) => (
          <p key={message.id}><strong>{message.senderId === auth.currentUser.uid ? 'You' : 'Other'}:</strong> {message.text}</p>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessagesComponent;
