import React, {useState} from 'react';
import axios from 'axios';
import validator from 'validator';
import { getAccessToken } from "./accessToken";
import jwtDecode from 'jwt-decode';
import {useHistory, Redirect} from 'react-router-dom';
import './css/Login.css';
import { Link } from "react-router-dom";


const Login = () => {

    const history = useHistory();

    const hrefStyle = {
        textDecoration: "underline",
        color: "gray"
    };

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const login = () => {
        axios.post('/login', {
            email: email,
            password: password,

        }).then((response) => {
            const token = getAccessToken();
            if (response.data.msg == "Login success") {
                //setLoginStatus("Sisselogitud: " + email);
                //console.log(getAccessToken() + "accesstoken");
                history.push("/");
                window.location.reload();
            } else {
                return true;
            }
            
        }, (error) => {
            if (error.response.status == 401) {
                setLoginStatus("E-mail voi parool on vale!");
            } else if (error.response.status == 400) {
                setLoginStatus("Sellise e-mailiga kasutajat ei ole registreeritud!");
            }
            console.log(loginStatus);
            console.log(error.response.status);
        })
        
        
    };
    
    return(
        <section className='login'>
            <div className="page-login">
                <div>
                    <button id="login-id">Sisene ID-kaardiga</button>
                </div>
                <div>
                    <button id="login-mobile">Sisene Mobiil-IDga</button>
                </div>
                <label>
                    <h3>E-mail</h3>
                    <input style={{border: "1px solid silver"}} className="login-email-input" placeholder="E-mail" type="email" name="email" id="email" onChange={e => {setEmail(e.target.value)}}/>
                </label>
                <label htmlFor="">
                    <h3>Salasõna</h3>                    
                    <input style={{border: "1px solid silver"}} className="login-password-input" placeholder="Salasõna" type="password" id="password" name="password" onChange={e => {setPassword(e.target.value)}}/>
                </label>
                <div>
                    <button className="login-button" type='submit' onClick={login}>Logi sisse</button>
                </div>
                <div>
                    <span style={{fontWeight: 'bold',color: 'red'}}>{loginStatus}</span>
                </div>
                <div>
                    <h4><Link to="/register" style={hrefStyle}>Registreeru kasutajaks</Link></h4>
                </div>
            </div>
        </section>
    );
}

export default Login;