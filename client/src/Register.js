import React, {useState} from 'react';
import axios from 'axios';
import validator from 'validator';

const Register = () => {


    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [regStatus, setRegStatus] = useState("");


    const register = () => {
        if(!passwordErr && !emailErr) {
            axios.post('http://localhost:3001/register', {
                email: emailReg,
                password: passwordReg,
            }).then((response) => {
                setRegStatus("Registreerimine õnnestus!");
                console.log(response.data);
            }, (error) => {
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
            <label>
                <h3>E-mail</h3>
                <input type="email" name="email" id="email" onChange={e => validateEmail(e)}/>
                <br/>
                <span style={{fontWeight: 'bold',color: 'red'}}>{emailErr}</span>
            </label>
            <label htmlFor="">
                <h3>Salasona</h3>
                <input type="password" id="password" name="password" onChange={e => validatePassword(e)}/>
                <br/>
                <span style={{fontWeight: 'bold',color: 'red'}}>{passwordErr}</span>
            </label>
            <div>
                <button type='submit' onClick={register} disabled={passwordErr || emailErr}>Registreeru</button>
            </div>
            <div>
                <span style={{fontWeight: 'bold',color: 'green'}}>{regStatus}</span>
            </div>      
        </section>

    )
}

export default Register;