import React from "react";
import { Redirect, Route } from "react-router-dom";
import {useUserContext} from './userContext';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  
  const {userId, isLoggedIn} = useUserContext();
  const isAuth = localStorage.getItem('loggedIn');

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;