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
          <Route path="/messages" element={<MessagesComponent />} />
          <Route path="/saved-posts" element={<Savedposts />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;