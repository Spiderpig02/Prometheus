import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";

export async function addUser(Uid, Username, Password, Email, Phonenumber, Rating, canRate, ratedBy, Blocked) {
  const usersDocRef = doc(firestore, "User", Uid);
  await setDoc(usersDocRef, {
    Username, Password, Email, Phonenumber: Number(Phonenumber), Rating, canRate, ratedBy, Blocked
  });
};

export async function addAd(Title, Description, userID, Picture, Schedule, Phonenumber, Type, Categories, Created, streetName, city) {

  const addsCollectinRef = collection(firestore, "Advertisement");
  await addDoc(addsCollectinRef,
    {
      Title: Title,
      Description: Description,
      userID: userID,
      Picture: Picture,
      Schedule: Schedule,
      Phonenumber: Phonenumber,
      Type: Type,
      Categories: Categories,
      Created: Created,
      streetName: streetName,
      city: city
    });
};
