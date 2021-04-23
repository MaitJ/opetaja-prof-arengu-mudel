import React from 'react';
import Main from './Main';
import Navbar from './Navbar';
import Kysimustik from './Kysimustik';

function App() {
  return (
    <React.Fragment>
      <Navbar>
        <h1>Navbar container</h1>
      </Navbar>
      <Main>
        <Kysimustik/>
      </Main>
    </React.Fragment>
  );
}

export default App;
