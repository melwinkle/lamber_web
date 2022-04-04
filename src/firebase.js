import { initializeApp } from "firebase/app";




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
  // const database = getDatabase(fireDb);
  export default fireDb;
  