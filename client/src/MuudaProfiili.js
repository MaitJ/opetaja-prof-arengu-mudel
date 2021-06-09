import axios from 'axios';
import {useEffect, useState} from 'react';
import { setAccessToken } from "./accessToken";
import { getAccessToken } from "./accessToken";
import jwtDecode from 'jwt-decode';
import env from 'react-dotenv';
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
    //           <h4>Vali enne kui "Lae yles" nuppu vajutad!</h4>
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
            <section className="profile-card">
                <img src='https://via.placeholder.com/300.png/09f/fff' alt='profilepic'></img>
                <input type='file' name="profilepic" onChange={e => {onFileChange(e)}}/>
                <button id='changepic' className='reg-but' type='submit' onClick={fileUpload}>Muuda pilti</button>
                <h2>{profiilAndmed.eesnimi} {profiilAndmed.perenimi}</h2>
                <h4>{profiilAndmed.kasutajaroll}</h4>
                <br/>
                <button className="profile-button">Profiil</button>
                <button className="profile-button">Õppematerjalid</button>
                <button className="profile-button">Minu küsimustikud</button>
                <br/>
                <button className="profile-button">Muuda profiili</button>
            </section>
            <section className="profile-data-1">
                <h1 className="profiil">Profiil</h1>
            <section className="profile-data">
                <h4>Eesnimi</h4>
                <input className="email-input" placeholder="Eesnimi" type="text" name="firstName" id="firstName" onChange={e => {setFirstName(e.target.value)}}/>
                <h4>Perekonnanimi</h4>
                <input className="email-input" placeholder="Perekonnanimi" type="text" name="lastName" id="lastName" onChange={e => {setLastName(e.target.value)}}/>
                <h4>E-mail</h4>
                <input className="email-input" placeholder="E-mail" type="email" name="email" id="email" onChange={e => {setEmail(e.target.value)}}/>
                <h4>Töökoht</h4>
                <input className="email-input" placeholder="Tookoht" type="text" name="job" id="job" onChange={e => {setJob(e.target.value)}}/>
                <h4>Telefon</h4>
                <input className="email-input" placeholder="Telefon" type="tel" name="phone" id="phone" onChange={e => {setPhone(e.target.value)}}/>
                <button id="register-button" className="reg-but" type='submit' onClick={changeProfile}>Salvesta</button>
                <h5>{changeStatus}</h5>
            </section>
            </section>
        </section>
    );
}

export default Profile;