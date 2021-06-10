import React, {useState, useEffect} from 'react';
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

const Header = () => {

    const history = useHistory();

    const { userEmail, userId, accessToken, setAccessToken, setUserEmail } = useUserContext();
    const [lastlogged, setLastLogged] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [body, setBody] = useState();

    const showMenu = false;

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
   

    return (
        <header>
            <div className="navbar-content">
                <p style={{display: "none"}}>profiil, küsimustikud, teated?, kontakt, meist</p>
                <h1><NavLink to="/" style={buttonStyleSecondary}>Logo</NavLink></h1>
                
                <div>
                    <NavLink activeStyle={activePage} to="/profile" style={buttonStyle}>Profiil</NavLink>
                </div>
                <div>
                    <NavLink activeStyle={activePage} to="/kysimustikud" style={buttonStyle}>Küsimustikud</NavLink>
                </div>
                <div>
                    <NavLink activeStyle={activePage} exact to="/" style={buttonStyle}>Teated</NavLink>
                </div>
                <div>
                    <NavLink activeStyle={activePage} exact to="/contact" style={buttonStyle}>Kontakt</NavLink>
                </div>
                <div>
                    <NavLink activeStyle={activePage} to="/about" style={buttonStyle}>Meist</NavLink>
                </div>
                <section className="profile-elements">
                    <button id="notification-button"><BsFillBellFill /></button>
                    <h3><NavLink to="/profile" style={buttonStyleSecondary}>Eesnimi</NavLink></h3>
                    <button id="dropdown-button"><IoIosArrowDown /></button>
                    <div className="dropdown">
                        <ul id="dropdown-items">
                            <li id="logout">Logi välja</li>
                        </ul>
                    </div>
                </section>
            </div>

            <div>
                <Link to="/register">Register</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/Contact">Kontakt</Link>
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