import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import firebase from "./firebase";
import { initializeApp } from "firebase/app";
import { getDatabase } from"firebase/database";
import {getAuth} from 'firebase/auth';



// var admin = require("firebase-admin");

// var serviceAccount = require("../src/admin/adminsdk.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://lamber-capstone-default-rtdb.firebaseio.com"
// });




const firebaseConfig = {
    apiKey: "AIzaSyB95v7_DVRwZWlxAgdPEAjMPX1-UaUgopI",
    authDomain: "lamber-capstone.firebaseapp.com",
    databaseURL: "https://lamber-capstone-default-rtdb.firebaseio.com",
    projectId: "lamber-capstone",
    storageBucket: "lamber-capstone.appspot.com",
    messagingSenderId: "546879107116",
    appId: "1:546879107116:web:932ead1ea347a834116189",
    measurementId: "G-SHT3QBQX9Q"
  };

  const fireDb = initializeApp(firebaseConfig);
  const database = getDatabase(fireDb);
 export const auth = getAuth(fireDb);

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
