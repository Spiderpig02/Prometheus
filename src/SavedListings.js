import { Box, Button, Container, List, ListItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "./firebaseConfig.js";
import React, { useEffect, useState } from 'react';
import './SavedListings.css';
import { Link } from "react-router-dom";
import Modal from 'react-modal';

export const AllListings = (props) => {

    const currentUser = auth.currentUser;
    const [checkedList, setCheckedList] = useState([]);
    const [savedAds, setSavedAds] = useState([]);
    const adsCollectionRef = collection(firestore, "Advertisement");
    const [search, setSearch] = useState("");
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
                console.log(userState);
                adsData.forEach(element => {
                    if (userState.Like.includes(element.id)) {
                        dummyList.push(element);
                    }
                });
            }
            //else {
            //     adsData.forEach(element => {
            //         if (element.Available === true) {
            //             dummyList.push(element);
            //         }
            //     });
            // };
            setSavedAds(dummyList);
        });
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
        getAds();

    }, [emptySearch, userState]);


    const handleSetChecked = (checked) => {
        setCheckedList(checked);
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
                <List>
                    {savedAds.map(ad => (
                        <Box key={ad.id} sx={{

                            //justifyContent: "space-between",
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
                                <h4 className="addType">
                                    {ad.Type}
                                </h4>
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
                                    <Link style={{ textDecoration: "none", color: "whitesmoke" }} onClick={() => props.recieveUser(ad.userID)} to={`/OtherUser`}  >
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