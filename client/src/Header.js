import React, {useState, useEffect, useRef, ReactDOM, Component} from 'react';
import { Link } from "react-router-dom";
import { setAccessToken } from "./accessToken";
import { getAccessToken } from "./accessToken";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {useHistory} from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { BsFillBellFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import {useUserContext} from './userContext';
import { GoThreeBars } from "react-icons/go";
import { ImCross } from 'react-icons/im';


const Header = () => {

    const history = useHistory();

    const { userEmail, userId, accessToken, setAccessToken, setUserEmail } = useUserContext();
    const [isLogged, setIsLogged] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [body, setBody] = useState();

    const [profiilAndmed, setProfiilAndmed] = useState({});

    useEffect(() => {
        if(userId !== undefined) {
            setIsLogged(true);
            axios.post('http://localhost:3001/getKasutaja', {
                kasutajaid: userId
            }).then((response) => {
                setProfiilAndmed(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }

        if(userId == undefined) {
            setIsLogged(false);
        }
        
    }, [userId]);


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
    };

    function logout () {
        axios.post('/logout').then((response) => {
            history.push("/login");
            window.location.reload();
            console.log(response.data + "on respond");
        })
        //setAccessToken("");
        //setLoggedIn(false);
    }

    return (
        <header>
            <div className="navbar-content">
                <div id="hamburger-icon">
                    <GoThreeBars />
                </div>
                <h1><NavLink id="navbar-logo" to="/" style={buttonStyleSecondary}>Logo</NavLink></h1>
                
                <div id="nav-item">
                    <NavLink activeStyle={activePage} to="/profile" style={buttonStyle}>Profiil</NavLink>
                </div>
                <div id="nav-item">
                    <NavLink activeStyle={activePage} to="/kysimustikud" style={buttonStyle}>Küsimustikud</NavLink>
                </div>
                <div id="nav-item">
                    <NavLink activeStyle={activePage} exact to="/" style={buttonStyle}>Teated</NavLink>
                </div>
                <div id="nav-item">
                    <NavLink activeStyle={activePage} exact to="/contact" style={buttonStyle}>Kontakt</NavLink>
                </div>
                <div id="nav-item">
                    <NavLink activeStyle={activePage} to="/about" style={buttonStyle}>Meist</NavLink>
                </div>
                {isLogged ? <section className="profile-elements">
                    <button id="notification-button"><BsFillBellFill /></button>
                    <h2><NavLink id="navbar-name" to="/profile" style={buttonStyleSecondary}>{profiilAndmed.eesnimi}</NavLink></h2>
                    <button id="dropdown-button"><IoIosArrowDown /></button>
                    </section> :
                    <div id="nav-item">
                     <NavLink to="/login" style={buttonStyleSecondary}>Logi sisse</NavLink>
                    </div>}
    
            </div>
            <div>
                {accessToken != "" ? (<button onClick={async () => {await logout(); setAccessToken(""); setUserEmail(""); console.log(accessToken + "See on getaccestoken")}}>Logi valja</button>) : null}
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