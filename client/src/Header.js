import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { setAccessToken } from "./accessToken";
import { getAccessToken } from "./accessToken";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {useHistory} from 'react-router-dom';

import { NavLink } from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";

const Header = () => {

    const history = useHistory();

    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState();
    const [lastlogged, setLastLogged] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [body, setBody] = useState();

    const buttonStyle = {
        textDecoration: "none",
        color: "rgba(255, 255, 255, 0.7)"
    };

    const buttonStyleSecondary = {
        textDecoration: "none",
        color: "white"
    };

    const activePage = {
        color: '#fff',
        textDecoration: 'underline'
    }

    function logout () {
        axios.post('/logout').then((response) => {
            history.push("/login");
            window.location.reload();
            console.log(response.data + "on respond");
        })
        //setAccessToken("");
        //setLoggedIn(false);
    }

    useEffect (() => {
    
        const token = getAccessToken();

        if (!token) {
            return true
        } else {
            const {email} = jwtDecode(token);
            const {id} = jwtDecode(token);
            setUserId(id);
            setUserEmail(email);
            console.log(getAccessToken() + "accesstoken");
        }

        console.log(userEmail + " on kasutaja email");
        
        
    })

    return (
        <header>
            <div className="navbar-content">
                <h1><NavLink to="/" style={buttonStyleSecondary}>Logo</NavLink></h1>
                <div>
                    <NavLink activeStyle={activePage} exact to="/" style={buttonStyle}>Home</NavLink>
                </div>
                <div>
                    <NavLink activeStyle={activePage} to="/profile" style={buttonStyle}>Profiil</NavLink>
                </div>
                <div>
                    <NavLink activeStyle={activePage} to="/kysimustikud" style={buttonStyle}>Kysimustik</NavLink>
                </div>
                <div>
                    <NavLink activeStyle={activePage} to="/about" style={buttonStyle}>About</NavLink>
                </div>
                <h3><NavLink to="/profile" style={buttonStyleSecondary}>Minu profiil</NavLink></h3>
            </div>
            <div className="profile-dropdown">
                    <Link to="/">Logi välja</Link>
            </div>
            <div>
                <Link to="/register">Register</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                {getAccessToken() != "" ? (<button onClick={async () => {await logout(); setAccessToken(""); setUserEmail(""); console.log(getAccessToken() + "See on getaccestoken")}}>Logi valja</button>) : null}
            </div>
            <div>
                {userEmail}
                <br />
                {userId}
            </div>
        </header>
    )
}

export default Header;