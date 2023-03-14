import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, firestore } from "./firebaseConfig";

function BlockedUserMyPage(props) {

    const currentUser = auth.currentUser;
    const [users, setUsers] = useState([]);
    const [userState, setUserState] = useState([]);
    const [viewedUsers, setViewedUsers] = useState([]);


    const getUsers = async () => {
        const userRef = collection(firestore, "User");
        await getDocs(userRef).then((snapShot) => {
            const userData = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const tmp = [];

            userData.map((user) => {
                return (user.id === currentUser.uid ? true : tmp.push(user))
            });
            setUsers(tmp);
        });
        console.log("get");
    };

    const getUser = async () => {
        const quary = query(doc(firestore, "User"), where("userID", "==", currentUser.uid));
        await getDoc(quary).then((snapShot) => {
            setUserState(snapShot.doc.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    };

    useEffect(() => {
        getUsers();
        getUser();
    }, []);

    const filterBySearch = () => {
        let searchText = document.getElementById("searchField").value;
        let filterdUsers = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].Username.toLowerCase().includes(searchText.toLowerCase()) ||
                users[i].Email.toLowerCase().includes(searchText.toLowerCase()) ||
                users[i].Phonenumber.toString().includes(searchText)) {
                filterdUsers.push(users[i]);
            };
        };

        setViewedUsers(filterdUsers);
    };

    return (
        <div className="blockedUsers">
            <div className="searchBar">
                <input onChange={() => {
                    filterBySearch();
                }} type="text" id="searchField" name="searchField"
                    placeholder="Søk etter brukere via brukername, tlf eller e-post"></input>
            </div>
            <ul className="users">
                {viewedUsers.map((user) => (<li className="user" key={user.id}>
                    <p className="username"> {user.Username} </p>
                    <button className="blokk/unblokk"> {currentUser ? "Blokk" : "Un blokk"} </button>
                </li>)
                )}
            </ul>
        </div>
    );
};

export default BlockedUserMyPage;