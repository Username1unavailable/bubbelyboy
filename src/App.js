import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import ProfileSettings from './components/ProfileSettings';
import LoadingScreen from './components/LoadingScreen';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import AuthCheck from './components/AuthCheck';
import Layout from './components/Layout';  // Import the Layout component

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;