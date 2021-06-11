import React, { Component, useState } from 'react';
import axios from 'axios';
import { NavLink, Switch } from "react-router-dom";
import Profilecard from './Profilecard';
import { getAccessToken } from "./accessToken";
import jwtDecode from 'jwt-decode';
import {useUserContext} from './userContext';

const Oppematerjal = () =>  {

  const [selectedFile, setSelectedFile] = useState();

  const {userId} = useUserContext();
  

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

  const fileUpload = () => {

    let formData = new FormData();

    formData.append("File", selectedFile);

    console.log(formData.get("File"));

    // const token = getAccessToken();

    // const {id} = jwtDecode(token);

    axios.post('http://localhost:3001/uploadfile', {
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
        userid: userId
    }).then((response) => {
        console.log("SEE ON RESPONSE: " + JSON.stringify(response.data));
    });
}

  // onChangeHandler=event=>{
  //   var files = event.target.files
  //   if(this.maxSelectFile(event) && this.checkMimeType(event)){ 
  //      this.setState({
  //      selectedFile: files,
  //      loaded:0
  //   })
  // }
  //}
  // onClickHandler = () => {
  //   const data = new FormData() 
  //   for(var x = 0; x<this.state.selectedFile.length; x++) {
  //     data.append('file', this.state.selectedFile[x])
  //   }
  //   axios.post("http://localhost:3001/kuhuiganes", data, {
  //   })
  //   }


    return (
      <section className="profile-oppematerjal">
        <Switch>
          <Profilecard/>
        </Switch>
      <div class="back-button-container">
        <NavLink className="back-button" to="/profile">Tagasi õppematerjalidesse</NavLink>
        <div class="oppematerjal-container">
            <div class="row">
              <form action='http://localhost:3001/uploadfile' method='post' encType="multipart/form-data">
                <label className="oppematerjal-label">Lae üles enda õppematerjalid </label>
                  <div class="form-group files">
                    <input className="choose-files" type="file" name='oppematerjal' multiple onChange={e => {onFileChange(e)}}/>
                  </div>  
                <label for="text">Õppematerjali pealkiri</label>
                <input type="text" id="title" name="title"></input>
                <label for="text">Õppematerjali kirjeldus</label>
                <textarea id="description" name="description" rows="6" cols="80"></textarea>
                <div class="form-group"> 
                  <button className="upload-files-button" type="submit" onClick={fileUpload}>Lae üles</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}  
export default Oppematerjal;