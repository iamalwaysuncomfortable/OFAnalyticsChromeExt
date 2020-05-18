var config = {
    apiKey: "AIzaSyBj0fm-s9gGkp3X8-9VYxlwNf147VNaIaQ",
    authDomain: "ps-attribution-tracker.firebaseapp.com",
    databaseURL: "https://ps-attribution-tracker.firebaseio.com",
    projectId: "ps-attribution-tracker",
    storageBucket: "ps-attribution-tracker.appspot.com",
    messagingSenderId: "734306689643",
    appId: "1:734306689643:web:9aa31265991a22d535072e",
    measurementId: "G-6WMDTBY8SY"
    };
    

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();