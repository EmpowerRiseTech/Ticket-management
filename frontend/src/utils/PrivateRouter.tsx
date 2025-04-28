import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from './cookieUtils';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = () => {
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally, you can add a loading spinner here
  }

  return isLoggedIn() ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;
