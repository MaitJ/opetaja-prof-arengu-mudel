
//Sellega merge
//import React from 'react';
import Main from './Main';
//import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React from 'react';
import './css/style.css';
import Routes from "./Routes";
import {UserProvider} from './userContext';

// const userIdContext = React.createContext();

function App() {


  

  return (
    <React.Fragment>
      <UserProvider>
        <Main>
          <Routes />
        </Main>
      </UserProvider>
    </React.Fragment>
  );
}

// export const useUserIdContext = () => {
//   return useContext(userIdContext);
// }




export default App;
