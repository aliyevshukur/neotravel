import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDqsIESLnL8EIYCfHYMwso6T0REkLeHwIQ",
  authDomain: "neomorphic-travel-ui-kit.firebaseapp.com",
  databaseURL: "https://neomorphic-travel-ui-kit.firebaseio.com",
  projectId: "neomorphic-travel-ui-kit",
  storageBucket: "neomorphic-travel-ui-kit.appspot.com",
  messagingSenderId: "792167753501",
  appId: "1:792167753501:web:a20c7184c60f729044e3f4",
};

firebase.initializeApp(firebaseConfig);

const fb = {
  root: firebase,
  database: firebase.database(),
  auth: firebase.auth(),
};

export default fb;
