import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, firestore } from "./firebaseConfig";
import { addUser } from "./IO";
import './BlockedUserMyPage.css';

function BlockedUserMyPage(props) {

    const currentUser = auth.currentUser;
    const [users, setUsers] = useState([]);
    const [userState, setUserState] = useState([]);
    const [viewedUsers, setViewedUsers] = useState([]);
    const [loadedInn, setLoadedInn] = useState("false");


    const getUsers = async () => {
        const userRef = collection(firestore, "User");
        await getDocs(userRef).then((snapShot) => {
            const userData = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const tmp = [];
            userData.map((user) => {
                return ((user.id === currentUser.uid || user.Email === "admin@admin.com") ? true : tmp.push(user))
            });
            setUsers(tmp);
        });
        setLoadedInn(loadedInn + "1");
    };

    const getUser = async () => {
        const userDoc = doc(firestore, "User", currentUser.uid)
        const user = await getDoc(userDoc);
        setUserState({ ...user.data(), id: user.id });
    };

    useEffect(() => {
        getUser();
        getUsers();
    }, []);

    useEffect(() => {
        getUser();
    }, [loadedInn]);

    useEffect(() => {
        setViewedUsers(users);
    }, [users]);

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

    const banUser = (userID) => {
        let userCopy = userState;
        if (userState.Blocked.includes(userID)) {
            let tmp = userCopy.Blocked.filter(e => e !== userID)
            userCopy.Blocked = tmp;
            addUser(userCopy.id, userCopy.Username, userCopy.Password, userCopy.Email, userCopy.Phonenumber, userCopy.Rating, userCopy.Interactions, userCopy.Blocked, userCopy.Like, userCopy.totalRating);
            setLoadedInn(loadedInn + "1");
            window.alert("Bruker er nå fjernet fra Blocked listen din");

        } else {
            userCopy.Blocked.push(userID);
            setUserState(userCopy);
            addUser(userCopy.id, userCopy.Username, userCopy.Password, userCopy.Email, userCopy.Phonenumber, userCopy.Rating, userCopy.Interactions, userCopy.Blocked, userCopy.Like, userCopy.totalRating);
            setLoadedInn(loadedInn + "1");
            window.alert("Bruker er nå lagt inn i Blocked listen din");
        };
    };

    const showBlockedUsers = () => {
        if (userState.length !== 0) {
            return (
                <ul className="users">
                    {viewedUsers.map((user) => (<li className="user" key={user.id}>
                        <h3 className="username"> {user.Username} </h3>
                        <button className="blokk" onClick={() => { banUser(user.id) }}> {userState.Blocked.includes(user.id) ? "Unblock" : "Block"} </button>
                    </li>)
                    )}
                </ul>);
        };
        return <h2> No users exist </h2>
    };

    return (
        <div className="blockedUsers">
            <div className="searchBar">
                <input onChange={() => {
                    filterBySearch();
                }} type="text" id="searchField" name="searchField"
                    placeholder="Søk etter brukere via brukernavn, telefonnummer eller e-post"></input>
            </div>
            {showBlockedUsers()}
        </div>
    );
};

export default BlockedUserMyPage;