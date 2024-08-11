import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import ProfileSettings from './components/ProfileSettings';
import LoadingScreen from './components/LoadingScreen';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import AuthCheck from './components/AuthCheck';

function App() {
  return (
    <Router>
      <AuthCheck />
      <Routes>
        <Route path="/" element={<PublicRoute component={LandingPage} />} />
        <Route path="/loading" element={<PrivateRoute component={LoadingScreen} />} />
        <Route path="/home" element={<PrivateRoute component={HomePage} />} />
        <Route path="/profile-settings" element={<PrivateRoute component={ProfileSettings} />} />
      </Routes>
    </Router>
  );
}

export default App;
