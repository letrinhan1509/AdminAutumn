import firebase from "@firebase/app";
import "@firebase/storage";


var firebaseConfig = {
  apiKey: "AIzaSyA8Se-jTQFPdAWaEN3qC5XpEmbnnFfaMnM",
  authDomain: "fashionshop-c6610.firebaseapp.com",
  projectId: "fashionshop-c6610",
  storageBucket: "fashionshop-c6610.appspot.com",
  messagingSenderId: "184279877528",
  appId: "1:184279877528:web:1543978f0b77964e418ded",
  measurementId: "G-DD7GJ0H89K"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
 
  export  {
    storage, firebase as default
  }
  