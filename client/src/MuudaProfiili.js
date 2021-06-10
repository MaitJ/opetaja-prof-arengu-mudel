import axios from 'axios';
import {useEffect, useState} from 'react';
import { setAccessToken } from "./accessToken";
import { getAccessToken } from "./accessToken";
import jwtDecode from 'jwt-decode';
import { NavLink, Switch } from "react-router-dom";
import env from 'react-dotenv';
import Profilecard from './Profilecard';
//import {useUserIdContext} from './App.js';
require('dotenv').config();

const currentProfileId = 21;
const profileUrl = "http://localhost:3001/getKasutaja";

const Profile = () => {

    //const {userId} = useUserIdContext();
    const [profiilAndmed, setProfiilAndmed] = useState({});
    const [userId, setUserId] = useState();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [job, setJob] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [changeStatus, setChangeStatus] = useState("");
    const [selectedFile, setSelectedFile] = useState();

    const fileUpload = () => {

        let formData = new FormData();

        formData.append("Faili nimi", selectedFile);

        console.log(selectedFile);

        axios.post('http://localhost:3001/uploadimage', {
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        });
    }

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    // const fileData = () => {
    
    //     if (selectedFile) {
           
    //       return (
    //         <div>
    //           <h2>Faili Detailid:</h2>
               
    //             <p>Faili Nimi: {selectedFile.name}</p>
   
               
    //             <p>Faili Tyyp: {selectedFile.type}</p>
   
               
    //             <p>
    //             Last Modified:{" "}
    //             {selectedFile.lastModifiedDate.toDateString()}
    //           </p>
   
    //         </div>
    //       );
    //     } else {
    //       return (
    //         <div>
    //           <br />
    //           <h3>Vali enne kui "Lae yles" nuppu vajutad!</h3>
    //         </div>
    //       );
    //     }
    // };
    

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
            //window.location.reload();
        }, (error) => {
            console.log(error);
            setChangeStatus("Midagi läks valesti!");
        })
    }

    useEffect(() => {

        const token = getAccessToken();

        const {id} = jwtDecode(token);

        setUserId(id);
        console.log(userId + " on userid");

        axios.post('http://localhost:3001/getKasutaja', {
            kasutajaid: id
        }).then((response) => {
            setProfiilAndmed(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        console.log(profiilAndmed);
    }, [profiilAndmed]);

    return(
        <section className="profile-container">
            <Switch>
                <Profilecard/>
            </Switch>
            <section className="profile-data-header">
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
                <button id="register-button" className="reg-but" type='submit' onClick={changeProfile}>Salvesta</button>
                <h5>{changeStatus}</h5>
            </section>
            </section>
        </section>
    );
}

export default Profile;