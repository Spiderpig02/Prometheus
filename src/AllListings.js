import { Box, Button, Container, List, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "./firebaseConfig.js";
import React, { useEffect, useState } from 'react';
import './AllListings.css';
import './MyListings.css';
import CheckboxSidebar from './CheckboxSidebar.jsx';
import './CheckboxSidebar.css'
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { addUser } from "./IO";

export const AllListings = (props) => {

    

    let path = "/OtherUser"



    let currentUser = auth.currentUser;

    if(currentUser==null){
        path= "/Logg Inn";
    };

    

    const [checkedList, setCheckedList] = useState([]);
    const [ads, setAds] = useState([]);
    const adsCollectionRef = collection(firestore, "Advertisement");
    const [emptySearch, setEmptySearch] = useState("");
    const [userState, setUserState] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalStreetName, setModalStreetName] = useState("Ferjemamnnsveien 10");
    const [modalCityName, setModalCityName] = useState("Trondheim");

    // Modal

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "698px",
            height: "35vw",
            padding: "0"
        },
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.1)'
        }
    };

    Modal.setAppElement('#root');

    const openModal = () => {
        console.log("Open modal")
        setIsOpen(true);
    }

    const afterOpenModal = () => {
        console.log("Modal is open?");
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const setStreetAndCity = (street, city) => {
        setModalStreetName(street);
        setModalCityName(city);
    }

    // End modal

    const getAds = async () => {
        await getDocs(adsCollectionRef).then((querySnapshot) => {
            const adsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            let dummyList = [];
            if (userState.length !== 0) {
                adsData.forEach(element => {
                    if (element.Available === true && !userState.Blocked.includes(element.userID)) {
                        dummyList.push(element);
                    }
                });
            } else {
                adsData.forEach(element => {
                    if (element.Available === true) {
                        dummyList.push(element);
                    }
                });
            };
            setAds(dummyList);
        });
    };


    const getQueryAds = async () => {
        const querys = query(adsCollectionRef, where('Categories', 'array-contains-any', checkedList))
        await getDocs(querys).then((querySnapshot) => {
            const adsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            let dummyList = [];
            if (userState.length !== 0) {
                adsData.forEach(element => {
                    if (element.Available === true && !userState.Blocked.includes(element.userID)) {
                        dummyList.push(element);
                    }
                });
            } else {
                adsData.forEach(element => {
                    if (element.Available === true) {
                        dummyList.push(element);
                    }
                });
            };
            setAds(dummyList);
        })
    };

    const getUser = async () => {
        const userDoc = doc(firestore, "User", currentUser.uid)
        const user = await getDoc(userDoc);
        setUserState({ ...user.data(), id: user.id });
    };

    useEffect(() => {
        if (currentUser) {
            getUser();
        }
    }, []);

    useEffect(() => {
        if (checkedList.length !== 0) {
            getQueryAds();
        } else {
            getAds();
        }

    }, [checkedList, emptySearch, userState]);


    const handleSetChecked = (checked) => {
        setCheckedList(checked);
    };
    const likeAd = (adID) => {
        let userCopy = userState;
        if (userState.Like.includes(adID)) {
            let tmp = userCopy.Like.filter(ad => ad !== adID)
            userCopy.Like = tmp;
            setUserState(userCopy);
            addUser(userCopy.id, userCopy.Username, userCopy.Password, userCopy.Email, userCopy.Phonenumber, userCopy.Rating, userCopy.Interactions, userCopy.Blocked, userCopy.Like, userCopy.totalRating);
        }
        else {
            userCopy.Like.push(adID);
            setUserState(userCopy);
            addUser(userCopy.id, userCopy.Username, userCopy.Password, userCopy.Email, userCopy.Phonenumber, userCopy.Rating, userCopy.Interactions, userCopy.Blocked, userCopy.Like, userCopy.totalRating);
        };

    };

    const filterBySearch = () => {
        let searchText = document.getElementById("searchField").value
        let adList = ads;
        let newAdList = [];
        for (let index = 0; index < adList.length; index++) {
            if (adList[index].Title.toLowerCase().includes(searchText.toLowerCase())) {
                newAdList.push(adList[index]);
            };
        };
        console.log(searchText);
        if (searchText.length === 0) {
            setEmptySearch(emptySearch + "1");
        } else {
            setAds(newAdList);
        };
    };

    return (
        <div>
            <Container>
                <Container className="ListingsContainer" sx={{ justifyContent: 'center', display: 'flex', padding: 0, paddingLeft: 0 }}>
                    <Box className='sidebar-container'>
                        <CheckboxSidebar className="sidebar" onChecked={handleSetChecked} />
                    </Box>
                </Container>
                <Typography variant='h2' sx={{ my: 4, textAlign: 'center', color: "primary.main" }} className="pageHeading">
                    Alle Annonser
                </Typography>
                <div className="searchBar">
                    <input onChange={(event) => {
                        filterBySearch();
                    }} type="text" id="searchField" name="searchField"
                        placeholder="Søk etter annonse..."></input>
                    {/* <button onClick={filterBySearch} id="searchFieldButton">Søk</button> */}
                </div>

                <List>
                    {ads.map(ad => (
                        <Box key={ad.id} sx={{
                            margin: "30px",
                            mx: 'auto',
                            width: 700
                        }}>
                            <Paper elevation={3} style={{
                                padding: 8,
                                border: "1px solid black",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                verticalAlign: "middle"
                            }}>

                                <div className="likedAndTypeWrapper">
                                    {userState.length !== 0 ? <button onClick={() => { likeAd(ad.id); setEmptySearch(emptySearch + "1") }} className={
                                        userState.Like.includes(ad.id) ? "HeartButtonFull" : "HeartButtonEmpty"
                                    }></button> : <span className="HeartButtonFull"></span>}
                                    <h4 className="addType">
                                        {ad.Type}
                                    </h4>
                                </div>

                                <div className="paperTitleAndDate">
                                    <h1>
                                        {ad.Title}
                                    </h1>
                                    <h4>
                                        Dato opprettet: {new Date(ad.Created * 1000).toString().slice(3, 10)} 2023
                                    </h4>
                                </div>
                                <h3>
                                    {ad.Description}
                                </h3>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                    parentSelector={() => document.body}
                                >
                                    <div id="modalTopBar">
                                        <h3>{modalStreetName}, {modalCityName}</h3>
                                        <span onClick={closeModal}>&times;</span>
                                    </div>

                                    <iframe src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyBzlvUEiaSm7RG_MEiCjLU0QpeTQyEXm5w&q=" + modalStreetName.replace(/\s/g, '+') + "+" + modalCityName.replace(/\s/g, '+')}
                                    ></iframe>
                                </Modal>
                                <h2>
                                    Kontakt: {ad.Phonenumber}
                                </h2>
                                <div>
                                    <Link style={{ textDecoration: "none", color: "whitesmoke" }} onClick={() => {
                                        openModal();
                                        setStreetAndCity(ad.streetName, ad.city);
                                    }}>
                                        <Button variant="outlined">Åpne kart</Button>
                                    </Link>
                                    <Link style={{ textDecoration: "none", color: "whitesmoke" }} onClick={() => props.recieveUser(ad.userID)} to={path}  >
                                        <Button variant="outlined">
                                            Se bruker sin side
                                            {/* useLocation for props gjennom link, mulig async? vet ikke  */}
                                        </Button>
                                    </Link>

                                </div>
                            </Paper>
                        </Box>
                    ))}
                </List>
            </Container>
        </div>
    );
}

export default AllListings;