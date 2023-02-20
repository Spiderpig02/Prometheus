import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCTdBw2BoB7wgu97Vaq5MODI_m23ArJ2yY",
    authDomain: "prometheus-7165f.firebaseapp.com",
    projectId: "prometheus-7165f",
    storageBucket: "prometheus-7165f.appspot.com",
    messagingSenderId: "191458230726",
    appId: "1:191458230726:web:a2dde77b002871e74bf2c7",
    measurementId: "G-CTJYXCGM83"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

