import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";
import { useEffect, useState } from 'react';
import { query, where } from "firebase/firestore";

export function useGetUserData() {

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(firestore, "User");

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getUsers();
    }, [usersCollectionRef]);

    return users;
};

export function useGetAllAds() {

    const [ads, setAds] = useState([]);
    const adsCollectionRef = collection(firestore, "Advertisement");

    useEffect(() => {
        const getAds = async () => {
            const data = await getDocs(adsCollectionRef);
            setAds(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getAds();
    }, [adsCollectionRef]);

    return ads;
};

export function useGetAdsFromUser(userID) {

    const [ads, setAds] = useState([]);
    const adsCollectionRef = collection(firestore, "Advertisement");
    const q = query(adsCollectionRef, where("userID", "==", userID))

    useEffect(() => {
        const getAds = async () => {
            const data = await getDocs(q);
            setAds(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getAds();
    }, [adsCollectionRef]);

    return ads;
};

export async function addUser(Username, Password, Email, Phonenumber) {

    const usersDocRef = doc(firestore, "User", Username);
    await setDoc(usersDocRef, { Username: Username, Password: Password, Email: Email, Phonenumber: Number(Phonenumber) });
};

export async function addAdd(Title, Description, userID, Picture, Schedule) {

    const addsCollectinRef = collection(firestore, "Advertisement");
    await addDoc(addsCollectinRef, { Title: Title, Description: Description, userID: userID, Picture: Picture, Schedule: Schedule });
};


