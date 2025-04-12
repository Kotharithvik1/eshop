import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
        // Remove all user data from localStorage after 5 minutes
        localStorage.clear();
        setIsAuthenticated(false);
      }, 900000); // 15 minutes in milliseconds

      // Clear timeout if the component unmounts or the auth state changes
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated]);

  // Redirect to login page if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
