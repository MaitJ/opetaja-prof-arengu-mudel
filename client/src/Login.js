import React, {useState} from 'react';
import axios from 'axios';
import validator from 'validator';
import { getAccessToken } from "./accessToken";
import jwtDecode from 'jwt-decode';
import {useHistory, Redirect} from 'react-router-dom';


const Login = () => {

    const history = useHistory();

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
            <label>
                    <h3>E-mail</h3>
                    <input type="email" name="email" id="email" onChange={e => {setEmail(e.target.value)}}/>
                </label>
                <label htmlFor="">
                    <h3>Salasona</h3>
                    <input type="password" id="password" name="password" onChange={e => {setPassword(e.target.value)}}/>
                </label>
                <div>
                    <button type='submit' onClick={login}>Logi sisse</button>
                </div>
                <div>
                    <span style={{fontWeight: 'bold',color: 'red'}}>{loginStatus}</span>
                </div>
        </section>
    );
}

export default Login;