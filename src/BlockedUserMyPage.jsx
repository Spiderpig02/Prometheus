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
    };

    const getUser = async () => {
        const userDoc = doc(firestore, "User", currentUser.uid)
        const user = await getDoc(userDoc);
        setUserState({ ...user.data(), id: user.id });
    };

    useEffect(() => {
        getUsers();
        getUser();
    }, []);

    useEffect(() => {
        getUser();
    }, [userState]);

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
            addUser(userCopy.id, userCopy.Username, userCopy.Password, userCopy.Email, userCopy.Phonenumber, userCopy.Rating, userCopy.canRate, userCopy.Blocked, userCopy.Like);
            window.alert("Bruker er nå fjernet fra Blocked listen din");

        } else {
            userCopy.Blocked.push(userID);
            setUserState(userCopy);
            addUser(userCopy.id, userCopy.Username, userCopy.Password, userCopy.Email, userCopy.Phonenumber, userCopy.Rating, userCopy.canRate, userCopy.Blocked, userCopy.Like);
            window.alert("Bruker er nå lag inn i Blocked listen din");
        };
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
                    <h3 className="username"> {user.Username} </h3>
                    <button className="blokk" onClick={() => { banUser(user.id) }}> {userState.Blocked.includes(user.id) ? "Un blokk" : "Blokk"} </button>
                </li>)
                )}
            </ul>
        </div>
    );
};

export default BlockedUserMyPage;