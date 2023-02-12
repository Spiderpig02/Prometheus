import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";
import React, { useEffect, useState } from 'react';

export function useInfoFromUser() {

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
}

export function useAddData() {

  const [adds, setAdds] = useState([]);
  const addsCollectinRef = collection(firestore, "Advertisement");

  useEffect(() => {
    const getAdds = async () => {
      const adds = await getDocs(addsCollectinRef);
      setAdds(adds.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getAdds();
  }, [addsCollectinRef]);

  return adds;
}



// class User {
//     constructor (username, password, email, phonenumber ) {
//         this.username = username;
//         this.password = password;
//         this.email = email;
//         this.phonenumber = phonenumber;
//     }
//     toString() {
//         return this.name + ', ' + this.password + ', ' + this.email + "," + this.phonenumber;
//     }
// }

// // Firestore data converter
// const userConverter = {
//     toFirestore: (User) => {
//         return {
//             username: User.username,
//             password: User.password,
//             email: User.email,
//             phonenumber: User.phonenumber
//             };
//     },
//     fromFirestore: (snapshot, options) => {
//         const data = snapshot.data(options);
//         return new User(data.name, data.password, data.email, data.phonenumber);
//     }
// };

// export async function getData(){
//     const docRef = doc(firestore, "User", "Askeladden");
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//     } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");    
//     }
// }

