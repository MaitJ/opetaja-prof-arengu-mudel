import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Switch } from "react-router-dom";
import Profilecard from './Profilecard';

class Oppematerjal extends Component {
    constructor(props) {
      super(props);
        this.state = {
          selectedFile: null,
          loaded:0
        }
     
    }

    checkMimeType=(event)=>{
      let files = event.target.files 
      let err = []
     const types = ['image/png', 'image/jpeg', 'application/pdf', 'etc']
      for(var x = 0; x<files.length; x++) {
           if (types.every(type => files[x].type !== type)) {
         }
       };
       for(var z = 0; z<err.length; z++) {
          event.target.value = null
      }
     return true;
    }
    
    maxSelectFile=(event)=>{
      let files = event.target.files
          if (files.length > 1) { 
             event.target.value = null
             return false;
        }
      return true;
   }

  onChangeHandler=event=>{
    var files = event.target.files
    if(this.maxSelectFile(event) && this.checkMimeType(event)){ 
       this.setState({
       selectedFile: files,
       loaded:0
    })
  }
  }
    // onClickHandler = () => {
    //   const data = new FormData() 
    //   for(var x = 0; x<this.state.selectedFile.length; x++) {
    //     data.append('file', this.state.selectedFile[x])
    //   }
    //   axios.post("http://localhost:3001/kuhuiganes", data, {
    //   })
    //   }
  

    render() {
        return (
        <section className="profile-oppematerjal">
          <Switch>
            <Profilecard/>
          </Switch>
          <div class="back-button-container">
            <NavLink className="back-button" to="/profile">Tagasi õppematerjalidesse</NavLink>
          <div class="oppematerjal-container">
              <div class="row">
                <label className="oppematerjal-label">Lae üles enda õppematerjalid </label>
                   <div class="form-group files">
                    <input className="choose-files" type="file" multiple onChange={this.onChangeHandler}/>
                  </div>  
                <label for="text">Õppematerjali pealkiri</label>
                <input type="text" id="title" name="title"></input>
                <label for="text">Õppematerjali kirjeldus</label>
                <textarea id="description" name="description" rows="6" cols="80"></textarea>
                <div class="form-group"> 
                  <button className="upload-files-button" type="button" onClick={this.onClickHandler}>Lae üles</button>
                </div>
              </div>
          </div>
          </div>
          </section>
        );
      }
    }
    
    export default Oppematerjal;