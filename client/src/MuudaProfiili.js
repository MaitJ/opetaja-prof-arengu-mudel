import axios from 'axios';
import {useEffect, useState} from 'react';
import { setAccessToken } from "./accessToken";
import { getAccessToken } from "./accessToken";
import jwtDecode from 'jwt-decode';
import { NavLink, Switch } from "react-router-dom";
import env from 'react-dotenv';
import Profilecard from './Profilecard';
import {useUserContext} from './userContext';
//import {useUserIdContext} from './App.js';
require('dotenv').config();

const currentProfileId = 21;
const profileUrl = "http://localhost:3001/getKasutaja";

const Profile = () => {

    //const {userId} = useUserIdContext();
    const [profiilAndmed, setProfiilAndmed] = useState({});
    //const [userId, setUserId] = useState();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [job, setJob] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [changeStatus, setChangeStatus] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    //const [profiilAndmed, setProfiilAndmed] = useState({});
    const [profilePic, setProfilePic] = useState({});
    const [imageAddr, setImageAddr] = useState();
    const [havePicture, setHavePicture] = useState(false);

    const {userId} = useUserContext();

    const fileUpload = (e) => {
        
        e.preventDefault();
        let data = new FormData();

        data.append("file", selectedFile);
        data.append("userid", userId);

        console.log(data.get("file"));

        console.log("SEE ON KASUTAJAID JAH: " + userId);

        fetch("http://localhost:3001/uploadimage", {
            method: "POST",
            body: data,
        })
        .then((result) => {
            console.log("File Sent Successful");
            console.log(result.data + "ON KASUTAJA DATA");
        })
        .catch((err) => {
            console.log(err);
        });

        
    } 

    useEffect(() => {
        if(userId !== undefined) {
            axios.post('http://localhost:3001/getKasutaja', {
                kasutajaid: userId
            }).then((response) => {
                setProfiilAndmed(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [userId]);

    const ImageAddr = "uploads/images/" + profiilAndmed.profilepicture + ".jpg";
    const defaultImageAddr = "uploads/images/defaultpic.png";
        

    useEffect(() => {
        if(profiilAndmed !== undefined) {
            console.log("PROFILEPIC: " + profiilAndmed.profilepicture);
            if(profiilAndmed.profilepicture != null || profiilAndmed.profilepicture != undefined) {
                setHavePicture(true);
            }
        }
    }, [profiilAndmed]);

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }
    
    const changeProfile = () => {
        axios.post('http://localhost:3001/changeprofile', {
            email: email,
            phone: phone,
            job: job,
            firstName: firstName,
            lastName: lastName,
            userid: userId
        }).then((response) => {
            console.log("SEE ON RESPONSE: " + JSON.stringify(response.data));
            if (JSON.stringify(response.data.msg)) {
                setChangeStatus("Andmete salvestamine õnnestus!");
                console.log("SEE ON CHANGESTATUS: " + changeStatus);
            }
            
            //history.push("/login");
            window.location.reload();
        }, (error) => {
            console.log(error);
            setChangeStatus("Midagi läks valesti!");
        })

        axios.post('http://localhost:3001/useridtest', {
            kasutajaid: userId
        }).then((response) => {
            console.log("SEE RESPONSE: " + JSON.stringify(response.data));
        })
    }

    //console.log(JSON.stringify(profilePic) + "SEE ON PROFILEPIC");

    return(
        <section className="profile-container">
           <section className="profile-card">
                {/* <img src='https://via.placeholder.com/300.png/09f/fff' alt='profilepic'></img> */}
                <form onSubmit={fileUpload} encType="multipart/form-data">
                {havePicture ? <img src={process.env.PUBLIC_URL + ImageAddr} alt='profilepic'></img> : <img src={process.env.PUBLIC_URL + defaultImageAddr} alt='profilepic'></img>} 
                    <input type='file' onChange={e => {onFileChange(e)}}/>
                    {/* <input type="text" value={userId} /> */}
                    <button id='changepic' className='reg-but' type='submit'>Muuda pilti</button>
                </form>
                <h2>{profiilAndmed.eesnimi} {profiilAndmed.perenimi}</h2>
                <h4>{profiilAndmed.kasutajaroll}</h4>
                <br/>
                <NavLink className="profile-button" to="/profile">Profiil</NavLink>
                <NavLink className="profile-button" to="/lisa-oppematerjal">Õppematerjalid</NavLink>
                <NavLink className="profile-button" to="/">Minu küsimustikud</NavLink>
                <NavLink className="profile-button" to='/muudaprofiili'>Muuda profiili</NavLink>
            </section>
            <section className="profile-container-1">
                <h1 className="profiil">Profiil</h1>
            <section className="profile-edit-data">
                <label>
                <h3>Eesnimi</h3>
                <input className="email-input" placeholder="Eesnimi" type="text" name="firstName" id="firstName" onChange={e => {setFirstName(e.target.value)}}/>
                </label>
                <label>
                <h3>Perekonnanimi</h3>
                <input className="email-input" placeholder="Perekonnanimi" type="text" name="lastName" id="lastName" onChange={e => {setLastName(e.target.value)}}/>
                </label>
                <label>
                <h3>E-mail</h3>
                <input className="email-input" placeholder="E-mail" type="email" name="email" id="email" onChange={e => {setEmail(e.target.value)}}/>
                </label>
                <label>
                <h3>Töökoht</h3>
                <input className="email-input" placeholder="Tookoht" type="text" name="job" id="job" onChange={e => {setJob(e.target.value)}}/>
                </label>
                <label>
                <h3>Telefon</h3>
                <input className="email-input" placeholder="Telefon" type="tel" name="phone" id="phone" onChange={e => {setPhone(e.target.value)}}/>
                </label>
                <br/>
                <button id="register-button" className="reg-but" type='submit' onClick={changeProfile}>Salvesta</button>
                <h5>{changeStatus}</h5>
            </section>
        </section>
    </section>
    );

}
export default Profile;