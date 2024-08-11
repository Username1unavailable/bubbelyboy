import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../ firebase';

const PrivateRoute = ({ component: Component }) => {
  return auth.currentUser ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;