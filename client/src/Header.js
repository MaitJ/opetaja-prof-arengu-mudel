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
    
    const [isMenu, setMenu] = React.useState(false);
    const [isBell, setBell] = React.useState(false);
    
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
                <h1><NavLink id="navbar-logo" to="/" style={buttonStyleSecondary}>Logo</NavLink></h1>
                
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
                    <button id="notification-button" onClick={() => setBell(!isBell)}><BsFillBellFill /></button>
                    <div className="notif-section">
                        {/* Praegu katki <div className="notif-content">
                            { isBell && <p>Teil pole ühtegi teadet!</p> }
                    </div> */}
                    </div> 
                    <h3><NavLink id="navbar-name" to="/profile" style={buttonStyleSecondary}>Eesnimi</NavLink></h3>
                    <button onClick={() => setMenu(!isMenu)} id="dropdown-button"><IoIosArrowDown /></button>
                </section>
            </div>
            {/* <div id="drop-content">
                { isMenu && <button id="logout-fake">Logi välja</button>}
    </div> */}

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