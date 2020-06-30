import * as firebase from "firebase";
import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDqsIESLnL8EIYCfHYMwso6T0REkLeHwIQ",
//   authDomain: "neomorphic-travel-ui-kit.firebaseapp.com",
//   databaseURL: "https://neomorphic-travel-ui-kit.firebaseio.com",
//   projectId: "neomorphic-travel-ui-kit",
//   storageBucket: "neomorphic-travel-ui-kit.appspot.com",
//   messagingSenderId: "792167753501",
//   appId: "1:792167753501:web:a20c7184c60f729044e3f4",
// };

var firebaseConfig = {
  apiKey: "AIzaSyCvZRs_zyYQ0Tl3NHOlIki1i7mYekZqijM",
  authDomain: "neomorphictravel.firebaseapp.com",
  databaseURL: "https://neomorphictravel.firebaseio.com",
  projectId: "neomorphictravel",
  storageBucket: "neomorphictravel.appspot.com",
  messagingSenderId: "304361192910",
  appId: "1:304361192910:web:c587f30c93187a10303f9f",
  measurementId: "G-TWFW03WYW0",
};

firebase.initializeApp(firebaseConfig);

const fb = {
  root: firebase,
  db: firebase.firestore(),
  auth: firebase.auth(),
};

export default fb;
