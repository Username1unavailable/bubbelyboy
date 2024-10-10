import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import ProfileSettings from './components/Home/ProfileSettings';
import LoadingScreen from './components/LoadingScreen';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import AuthCheck from './components/AuthCheck';
import Layout from './components/Layout';  // Import the Layout component
import MessagesComponent from './components/Home/messages';
import Savedposts from './components/Home/saved-posts';
import Bubbels from './components/Home/clubs';
import ChatsListComponent from './components/Home/ChatsListComponent'; // Add Chat list component
import UserPage from './components/Home/UserPage';




function App() {
  return (
    <Router>
      <AuthCheck />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute component={LandingPage} />} />
        <Route path="/loading" element={<PrivateRoute component={LoadingScreen} />} />

        {/* Private Routes wrapped inside the Layout */}
        <Route element={<PrivateRoute component={Layout} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/clubs" element={<Bubbels />} />
          <Route path="/saved-posts" element={<Savedposts />} />
          <Route path="/user-page" element={<UserPage />} />
          {/* Chat routes - Chat list will always be visible */}
          <Route 
            path="/messages/*" 
            element={
              <div style={{ display: 'flex', height: '100vh' }}>
                <ChatsListComponent />  {/* Chat list on the left */}
                <Routes>
                  <Route path=":chatId" element={<MessagesComponent />} />  {/* Chat window on the right */}
                </Routes>
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
