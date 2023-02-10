import "./firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";

class User {
    constructor (username, password, email, phonenumber ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phonenumber = phonenumber;
    }
    toString() {
        return this.name + ', ' + this.password + ', ' + this.email + "," + this.phonenumber;
    }
}

// Firestore data converter
const userConverter = {
    toFirestore: (User) => {
        return {
            username: User.username,
            password: User.password,
            email: User.email,
            phonenumber: User.phonenumber
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.name, data.password, data.email, data.phonenumber);
    }
};

export async function getData(){
    const docRef = doc(firestore, "User", "Askeladden");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");    
    }
}

