import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";

export async function addUser(Uid, Username, Password, Email, Phonenumber) {
  const usersDocRef = doc(firestore, "User", Uid);
  await setDoc(usersDocRef, {
    Username: Username, Password: Password, Email: Email, Phonenumber: Number(Phonenumber)
  });
};

export async function addAd(Title, Description, userID, Picture, Schedule, Phonenumber, Type, Categories, Created) {

  const addsCollectinRef = collection(firestore, "Advertisement");
  await addDoc(addsCollectinRef,
    {
      Title: Title, Description: Description, userID: userID,
      Picture: Picture, Schedule: Schedule, Phonenumber: Phonenumber,
      Type: Type, Categories: Categories, Created: Created
    });
};