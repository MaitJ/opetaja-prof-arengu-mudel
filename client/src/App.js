import React from 'react';
import Main from './Main';
import Navbar from './Navbar';
import Kysimustik from './Kysimustik';
import Profile from './Profile.js';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Main>
        <Navbar/>
        <Profile/>
      </Main>
    </React.Fragment>
  );
}

export default App;
