import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, firestore } from "./firebaseConfig";
import { addUser } from "./IO";
import './BlockedUserMyPage.css';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BlockedUserMyPage(props) {

    let path = "/OtherUser"
    const navigation = useNavigate();

    const currentUser = auth.currentUser;
    const [users, setUsers] = useState([]);
    const [userState, setUserState] = useState([]);
    const [viewedUsers, setViewedUsers] = useState([]);
    const [loadedInn, setLoadedInn] = useState("false");

    const userRef = collection(firestore, "User");

    const getUsers = async () => {
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

    const toOtherUserPage = async (email) => {
        await getDocs(userRef).then((snapShot) => {
            const userData = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            userData.map((user) => {
                if (user.Email === email ) {
                    console.log(user.id)
                    navigation(path, {state:{uid:user.id}})
                }
            });
            return null
        });
    }

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

    const showInteractions = () => {
        if (userState.length !== 0) {
            return (
                <ul className="users">
                    {userState.Interactions.map((email) => (<li className="user" key={email}>
                        <h3 className="username"> {email} </h3>
                            <Button  style={{ textDecoration: "none", color: "whitesmoke" }} variant="outlined" value={email} onClick={(event) => toOtherUserPage(event.target.value)}>
                                Se bruker sin side
                                {/* useLocation for props gjennom link, mulig async? vet ikke  */}
                            </Button>
                    </li>)
                    )}
                </ul>);
        };
        return <h2> No user interactions yet! </h2>
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
            {showInteractions()}
        </div>
    );
};

export default BlockedUserMyPage;