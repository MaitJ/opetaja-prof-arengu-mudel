
//Sellega merge
//import React from 'react';
import Main from './Main';
import Navbar from './Navbar';
import Kysimustik from './Kysimustik';
import MainWRoutes from './MainWRoutes';
import Profile from './Profile.js';
//import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom';
import Login from './Login.js';
import Register from './Register';
import About from './About.js';
import Home from './Home.js';
import Contact from './Contact.js';
import './css/style.css';
import { setAccessToken } from "./accessToken";
import { getAccessToken } from "./accessToken";
import jwtDecode from "jwt-decode";
import Routes from "./Routes";
import axios from 'axios';
import './css/style.css';

// const userIdContext = React.createContext();

function App() {

  const history = useHistory();
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [jwt, setJwt] = useState();


  function isAuthenticated() {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  }


  const fetchAccessToken = () => {
    fetch("/refresh_token", {
      method: "POST",
      credentials: "include"
    }).then(async x => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
      console.log(getAccessToken() + "ACCTOKEN");
    }, (error) => {
      if (error) {
        console.log(error);
        setError("Your refresh token is invalid. Try to relogin");
      }
    })
  }

  useEffect(() => {

    if (isAuthenticated()) {
      fetchAccessToken();
    }

    // const token = getAccessToken();
    // const {id} = jwtDecode(token);
    // console.log("TOUKENTOUKEN: " + token);
    // setUserId(id);



    // else {
    //   history.push("/login");
    //   window.location.reload();
    // }
  }, []);

  // if (loading) {
  //   return <div>loading...</div>;
  // }

  

  return (
    <React.Fragment>
      
      <Main>
        <Routes />
      </Main>
    
    </React.Fragment>
  );
}

// export const useUserIdContext = () => {
//   return useContext(userIdContext);
// }




export default App;
