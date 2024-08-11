import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../ firebase';

const PublicRoute = ({ component: Component }) => {
  return !auth.currentUser ? <Component /> : <Navigate to="/home" />;
};

export default PublicRoute;
