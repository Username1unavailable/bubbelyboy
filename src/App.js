import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap your routes inside <Routes> */}
        <Route path="/" element={<PublicRoute component={LandingPage} />} />
        <Route path="/home" element={<PrivateRoute component={HomePage} />} />
      </Routes>
    </Router>
  );
}

export default App;