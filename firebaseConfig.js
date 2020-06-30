import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCvZRs_zyYQ0Tl3NHOlIki1i7mYekZqijM",
  authDomain: "neomorphictravel.firebaseapp.com",
  databaseURL: "https://neomorphictravel.firebaseio.com",
  projectId: "neomorphictravel",
  storageBucket: "neomorphictravel.appspot.com",
  messagingSenderId: "304361192910",
  appId: "1:304361192910:web:cd7dd63ed4859dcf303f9f",
  measurementId: "G-B7FZTREDQ7",
};

firebase.initializeApp(firebaseConfig);

const fb = {
  root: firebase,
  database: firebase.database(),
  auth: firebase.auth(),
};

export default fb;
