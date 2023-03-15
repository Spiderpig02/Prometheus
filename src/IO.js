import { async } from "@firebase/util";
import { doc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";

export async function addUser(Uid, Username, Password, Email, Phonenumber, Rating, canRate, Blocked, Like) {
    const usersDocRef = doc(firestore, "User", Uid);
    await setDoc(usersDocRef, {
        Username, Password, Email, Phonenumber: Number(Phonenumber), Rating, canRate, Blocked, Like
    });
};

export async function addAd(Title, Description, userID, Phonenumber, Type, Categories, Created, streetName, city) {

    const addsCollectinRef = collection(firestore, "Advertisement");
    await addDoc(addsCollectinRef,
        {
            Title: Title, Description: Description, userID: userID, Phonenumber: Phonenumber,
            Type: Type, Categories: Categories, Created: Created, streetName: streetName, city: city, Available: true, LoanedBy: null
        });
};


export async function updateAd(Title, Description, userID, Phonenumber, Type, Categories, Created, streetName, city, Available, LoanedBy, id) {
    const updateField = doc(firestore, "Advertisement", id)
    await updateDoc(updateField,
        {
            Title: Title,
            Description: Description,
            userID: userID,
            Phonenumber: Phonenumber,
            Type: Type,
            Categories: Categories,
            Created: Created,
            streetName: streetName,
            city: city,
            Available: Available,
            LoanedBy: LoanedBy
        });
};