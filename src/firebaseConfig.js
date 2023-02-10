import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyCTdBw2BoB7wgu97Vaq5MODI_m23ArJ2yY",
    authDomain: "prometheus-7165f.firebaseapp.com",
    projectId: "prometheus-7165f",
    storageBucket: "prometheus-7165f.appspot.com",
    messagingSenderId: "191458230726",
    appId: "1:191458230726:web:a2dde77b002871e74bf2c7",
    measurementId: "G-CTJYXCGM83"
})

export const auth = firebase.auth();
export const database = firebase.firestore();

