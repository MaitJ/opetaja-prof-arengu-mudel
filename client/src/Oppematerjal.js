import React, { useState } from 'react';
import { NavLink, Switch } from "react-router-dom";
import Profilecard from './Profilecard';
import {useUserContext} from './userContext';
require('dotenv').config()

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Oppematerjal = () =>  {

  const [selectedFile, setSelectedFile] = useState();
  const [fileTitle, setFileTitle] = useState();
  const [fileDescription, setFileDescription] = useState();
  const [uploadSuccess, setUploadSuccess] = useState();

  const {userId} = useUserContext();

  const createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };
  

  const onFileChange = (e) => {
    if(maxSelectFile(e) && checkMimeType(e)) {
      setSelectedFile(e.target.files[0]);
    }
  }

  const checkMimeType=(e)=>{
    let files = e.target.files 
    let err = []
    const types = ['image/png', 'image/jpeg', 'application/pdf', 'etc']
    for(var x = 0; x<files.length; x++) {
          if (types.every(type => files[x].type !== type)) {
        }
      };
      for(var z = 0; z<err.length; z++) {
        e.target.value = null
    }
    return true;
  }
    
  const maxSelectFile=(e)=>{
    let files = e.target.files
        if (files.length > 1) { 
            e.target.value = null
            return false;
      }
    return true;
  }

  const fileUpload = (e) => {
        
    e.preventDefault();
    let data = new FormData();

    data.append("file", selectedFile);
    data.append("userid", userId);
    data.append("title", fileTitle);
    data.append("desc", fileDescription);

    console.log(data.get("file"));

    console.log("SEE ON KASUTAJAID JAH: " + userId);

    fetch(`${SERVER_URL}/uploadfile`, {
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

 


    return (
      <section className="profile-oppematerjal">
        <Switch>
          <Profilecard/>
        </Switch>
      <section className="oppematerjal-container-1">
      <div class="back-button-container">
        <NavLink className="back-button" to="/oppematerjalid">Tagasi õppematerjalidesse</NavLink>
        <div class="oppematerjal-container">
            <div class="row">
              <form onSubmit={fileUpload} encType="multipart/form-data">
                <label className="oppematerjal-label">Lae üles enda õppematerjalid </label>
                  <div class="form-group files">
                    <input className="choose-files" type="file" name='oppematerjal' multiple onChange={e => {onFileChange(e)}}/>
                  </div>  
                <label for="text">Õppematerjali pealkiri</label>
                <input type="text" id="title" name="title" onChange={e => {setFileTitle(e.target.value)}}></input>
                <label for="text">Õppematerjali kirjeldus</label>
                <textarea id="description" name="description" rows="6" cols="80" onChange={e => {setFileDescription(e.target.value)}}></textarea>
                <div class="form-group"> 
                  <button className="upload-files-button" type="submit">Lae üles</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </section>
      </section>
  )
}  
export default Oppematerjal;