const firebaseConfig = {
    apiKey: "AIzaSyCEw0I9F2GUZGgWpMc_X0wUYIur5Bz-Stc",
    authDomain: "sawyerschat2.firebaseapp.com",
    projectId: "sawyerschat2",
    storageBucket: "sawyerschat2.appspot.com",
    messagingSenderId: "1046012671175",
    appId: "1:1046012671175:web:760ef2b0c08a4e0fda3ae2",
    measurementId: "G-4ELTFFXJ7D"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
