import firebase from 'firebase';


const app = firebase.initializeApp({
    apiKey: "AIzaSyCdlclzW2GVM-tJOZgGJtOKfUQeLw1vcSQ",
    authDomain: "best-day-generator.firebaseapp.com",
    databaseURL: "https://best-day-generator.firebaseio.com",
    projectId: "best-day-generator",
    storageBucket: "best-day-generator.appspot.com",
    messagingSenderId: "78378789006",
    appId: "1:78378789006:web:a47685a2d3056c735a01df",
    measurementId: "G-SL3HX6QDBH"
  });
  firebase.analytics();

  export const auth = app.auth();
  export default app;