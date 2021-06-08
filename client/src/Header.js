import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { setAccessToken } from "./accessToken";
import { getAccessToken } from "./accessToken";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {useHistory} from 'react-router-dom';

const Header = () => {

    const history = useHistory();

    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState();
    const [lastlogged, setLastLogged] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [body, setBody] = useState();

    const buttonStyle = {
        textDecoration: "none",
        color: "white"
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
                <h1><Link to="/" style={buttonStyle}>Logo</Link></h1>
                <div>
                    <Link to="/" style={buttonStyle}>Home</Link>
                </div>
                <div>
                    <Link to="/profile" style={buttonStyle}>Profiil</Link>
                </div>
                <div>
                    <Link to="/kysimustikud" style={buttonStyle}>Kysimustik</Link>
                </div>
                <div>
                    <Link to="/about" style={buttonStyle}>About</Link>
                </div>
                <h3><Link to="/profile" style={buttonStyle}>Minu profiil</Link></h3>
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