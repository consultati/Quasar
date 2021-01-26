//import * as firebase from "firebase/app";
import firebase from "firebase/app";
import "firebase/firestore";

// Agregar configuración firebase:
var firebaseConfig = {
  apiKey: "AIzaSyCmR5c38kKIXs4HQtXyQjN8cFuwhN8nF3I",
    authDomain: "agenda-3ed31.firebaseapp.com",
    databaseURL: "https://agenda-3ed31.firebaseio.com",
    projectId: "agenda-3ed31",
    storageBucket: "agenda-3ed31.appspot.com",
    messagingSenderId: "666377545226",
    appId: "1:666377545226:web:f1b8e1c426571d2a1ca1f3"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { db, firebase };