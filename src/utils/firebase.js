import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyB8boHEAEZ3bKlIaAMXqZuBKc3aMaifr-8",
  authDomain: "magazinvirtual-8ddcf.firebaseapp.com",
  projectId: "magazinvirtual-8ddcf",
  storageBucket: "magazinvirtual-8ddcf.appspot.com",
  messagingSenderId: "969709835232",
  appId: "1:969709835232:web:b2aa820346383e4407d185"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;