import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDiq_swUBbmqNdptXZ8iXraq1UDeYzlrbg",
    authDomain: "netflix-clone-253f0.firebaseapp.com",
    projectId: "netflix-clone-253f0",
    storageBucket: "netflix-clone-253f0.appspot.com",
    messagingSenderId: "747070386142",
    appId: "1:747070386142:web:50e23f3ba1b20c4f3ff74f",
    measurementId: "G-ZRX0KNK07V"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase