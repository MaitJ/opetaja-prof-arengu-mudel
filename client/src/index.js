import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getAccessToken, setAccessToken } from "./accessToken";
import jwt_decode from "jwt-decode";
import jwtDecode from 'jwt-decode';


// const isTokenValid = () => {
//   token = getAccessToken();

//   if (!token) {
//     return true;
//   }

//   try {
//     const exp = jwtDecode(token);
//     if (Date.now() >= exp * 1000) {
//       return false;
//     } else {
//       return true;
//     }
//   } catch {
//     return false;
//   }
//   }
// }

// const token = getAccessToken();
// const exp = jwtDecode(token);
// console.log(exp);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
