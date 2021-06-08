import React, {useState} from 'react';
import axios from 'axios';
import validator from 'validator';
import {useHistory} from 'react-router-dom';
import './css/Login.css';
import { Link } from "react-router-dom";

const Register = () => {

    const history = useHistory();

    const hrefStyle = {
        textDecoration: "underline",
        color: "gray"
    };

    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [phoneReg, setPhoneReg] = useState();
    const [jobReg, setJobReg] = useState();
    const [firstNameReg, setFirstNameReg] = useState();
    const [lastNameReg, setLastNameReg] = useState();
    const [regStatus, setRegStatus] = useState("");


    const register = () => {
        if(!passwordErr && !emailErr) {
            axios.post('http://localhost:3001/register', {
                email: emailReg,
                password: passwordReg,
                phone: phoneReg,
                job: jobReg,
                firstName: firstNameReg,
                lastName: lastNameReg
            }).then((response) => {
                setRegStatus("Registreerimine õnnestus!");
                history.push("/login");
                window.location.reload();
                //console.log(response.data);
            }, (error) => {
                console.log(error);
                setRegStatus("Midagi läks valesti!");
            })
        }
    };

    const validatePassword = (e) => {
        var validatedPassword = e.target.value;

        if (validator.isStrongPassword(validatedPassword)) {
            setPasswordReg(validatedPassword);
            setPasswordErr("");
        } else {
            setPasswordErr("Salasonas peab olema vahemalt 8 karakterit, 1 suur taht, 1 number ja 1 symbol!");
        }
    }

    const validateEmail = (e) => {
        var validatedEmail = e.target.value;

        if (validator.isEmail(validatedEmail)) {
            setEmailReg(validatedEmail);
            setEmailErr("");
        } else {
            setEmailErr("Sisestage korralik email!");
        }
    }

    return (
        <section className='register'>
            <div className='reg-page'>
                <div>
                    <h4><Link to="/login" style={hrefStyle}>Kasutaja olemas? Logi sisse</Link></h4>
                </div>
                <label>
                    <h3>Eesnimi</h3>
                    <input placeholder="Eesnimi" type="text" id="firstName" name="firstName" onChange={e => setFirstNameReg(e)}/>
                    <br/>
                </label>
                <label>
                    <h3>Perekonnanimi</h3>
                    <input placeholder="Perekonnanimi" type="text" id="lastName" name="lastName" onChange={e => setLastNameReg(e)}/>
                    <br/>
                </label>
                <label>
                    <h3>E-mail</h3>
                    <input placeholder="E-mail" type="email" name="email" id="email" onChange={e => validateEmail(e)}/>
                    <br/>
                    <span style={{fontWeight: 'bold',color: 'red'}}>{emailErr}</span>
                </label>
                <label htmlFor="">
                    <h3>Salasõna</h3>
                    <input placeholder="Parool" type="password" id="password" name="password" onChange={e => validatePassword(e)}/>
                    <br/>
                    <span style={{fontWeight: 'bold',color: 'red'}}>{passwordErr}</span>
                </label>
                <label>
                    <h3>Telefon</h3>
                    <input placeholder="Telefoni number" type="tel" id="phone" name="phone" onChange={e => setPhoneReg(e)}/>
                    <br/>
                </label>
                <label>
                    <h3>Töökoht</h3>
                    <input placeholder="Töökoht" type="text" id="job" name="job" onChange={e => setJobReg(e)}/>
                    <br/>
                </label>
                <div>
                    <button id="register-button" className="reg-but" type='submit' onClick={register} disabled={passwordErr || emailErr || emailReg == "" || passwordReg == "" || phoneReg == "" || jobReg == ""}>Registreeru</button>
                </div>
                <div>
                    <span style={{fontWeight: 'bold',color: 'green'}}>{regStatus}</span>
                </div>
            </div>      
        </section>

    )
}

export default Register;