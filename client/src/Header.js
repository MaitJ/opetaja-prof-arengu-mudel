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

const Header = () => {

    const history = useHistory();

    const { userEmail, userId, accessToken, setAccessToken, setUserEmail } = useUserContext();
    const [lastlogged, setLastLogged] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [body, setBody] = useState();

    const [showHamburger, setShowHamburger] = React.useState(false);
    const [showNotif, setShowNotif] = React.useState(false);
    const [showDrop, setShowDrop] = React.useState(false);

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

    function showBurgerMenu() {
        setShowHamburger(!showHamburger);
        if (showDrop == true) {
            setShowDrop(false);
        }
        if (showNotif == true) {
            setShowNotif(false);
        }
    }
    
    function toggleDrop() {
        setShowDrop(!showDrop);
    };

    function wrapperToggleDrop() {
        setShowDrop(!showDrop)
        if (showNotif == true) {
            setShowNotif(false);
        }
        if (showHamburger == true) {
            setShowHamburger(false);
        }
    }
    function wrapperToggleNotif() {
        setShowNotif(!showNotif)
        if (showDrop == true) {
            setShowDrop(false);
        }
        if (showHamburger == true) {
            setShowHamburger(false);
        }
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
                <div id="hamburger-icon" onClick={showBurgerMenu}>  
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

                <div className="profile-elements">
                    <div id="profile-1">
                        <button id="notification-button" onClick={wrapperToggleNotif}><BsFillBellFill /></button>
                        { showNotif && 
                        <div className="notifications">
                            <p>Teil pole ühtegi teadet!</p>
                        </div>
                        }
                    </div>
                    <div id="profile-2">
                        <h3><NavLink id="navbar-name" to="/profile" style={buttonStyleSecondary}>Eesnimi</NavLink></h3>
                        <button id="dropdown-button" onClick = {wrapperToggleDrop}><IoIosArrowDown /></button>
                    </div>
                </div>

            </div>

            { showDrop &&
            <div className="dropdown">
               <div id="drop-1" onClick = {toggleDrop}>
                    <button>Minu profiil</button>
               </div>
                <div id="drop-2" onClick = {toggleDrop}>
                    <button>KKK</button>
                </div>
                <div id="drop-3" onClick = {toggleDrop}>
                    <button>Logi välja</button>
                </div>
            </div>
            }

            { showHamburger && 
            <div className="hamburger-menu">
                <div>
                    <Link to="/profile" style={buttonStyleSecondary} onClick={() => setShowHamburger(!showHamburger)}>Profiil</Link>
                </div>
                <div>
                    <Link to="/kysimustikud" style={buttonStyleSecondary} onClick={() => setShowHamburger(!showHamburger)}>Küsimustikud</Link>
                </div>
                <div>
                    <Link to="/" style={buttonStyleSecondary} onClick={() => setShowHamburger(!showHamburger)}>Teated</Link>
                </div>
                <div>
                    <Link to="/contact" style={buttonStyleSecondary} onClick={() => setShowHamburger(!showHamburger)}>Kontakt</Link>    
                </div>
                <div>
                    <Link to="/about" style={buttonStyleSecondary} onClick={() => setShowHamburger(!showHamburger)}>Meist</Link>
                </div>
            </div> }
            
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