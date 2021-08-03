import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDRkvZmm5dP7_lNGV1_USDO6bEapwOrnRY",
    authDomain: "keepit-25e60.firebaseapp.com",
    databaseURL: "https://keepit-25e60.firebaseio.com",
    projectId: "keepit-25e60",
    storageBucket: "keepit-25e60.appspot.com",
    messagingSenderId: "65837104821",
    appId: "1:65837104821:web:28e2e032fc9b8531aac8fc",
    measurementId: "G-3YPZ7Y2Q0S"
  };

  firebase.initializeApp(firebaseConfig);

export default firebase;