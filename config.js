//firebase
const firebaseConfig = {
  apiKey: "AIzaSyBlqNHdLwYQ_7o0UgXpMbQxt1d7l5F1H4s",
  authDomain: "maps-42f90.firebaseapp.com",
  databaseURL: "https://maps-42f90-default-rtdb.firebaseio.com",
  projectId: "maps-42f90",
  storageBucket: "maps-42f90.appspot.com",
  messagingSenderId: "645482197750",
  appId: "1:645482197750:web:980af93b0137d2c130b2d7",
  measurementId: "G-67PQD2TSR7",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
