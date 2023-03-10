import { Box, Button, Container, List, ListItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import AlertDialog from "./AlertDialog";
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, deleteDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "./firebaseConfig.js";
import './MyListings.css'
import { Navigate } from "react-router";
import MineAnnonserSidebar, { listCategory } from './MineAnnonserSidebar.jsx';
import './MineAnnonserSidebar.css'

export const MyListings = (props) => {

    const user = auth.currentUser;
    const [myAds, setAds] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [myFilteredAds, setMyFilteredAds] = useState([]);
    
    useEffect(() => {
        //if (statusList.length === 0) {
        //if (myFilteredAds.length === 0) {
        if (myAds.length === 0) {
            getMyAds()
        }
        filter();
        console.log("Inni useEffect");
    }, []);
    
    const handleSetStatus = (checked) => {
    setStatusList(checked);//kaller ikke getMyAds
    getMyAds(checked); 
    console.log("den blir satt fra stastus");
    };
    
    const getMyAds = async () => {
        await getDocs(query(collection(firestore, "Advertisement"), where("userID", "==", user.uid)))
        .then((querySnapshot) => {
        const myAdsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setAds(myAdsData);
        console.log("den blir satt fra getMyAds");
        }); }

    const filter = () => {
        myFilteredAds.length = 0;
        for (let index = 0; index < myAds.length; index++) {
            if (statusList.length === 0 || statusList.length === 2) {
                myFilteredAds.push(myAds[index])
            }
            else if (statusList.length === 1) {
                if (statusList[0] === "Tilgjengelig" && myAds[index].Available === true) {
                    myFilteredAds.push(myAds[index])
                }
                if (statusList[0] === "Utlånt" && myAds[index].Available === false) {
                    myFilteredAds.push(myAds[index])
                }
            }
        }
        console.log("den blir satt fra filter");
    };

    if (user !== null) {

        return (

            <div className="myAdvertsPaperContainer" >
                <Container>
                    <Box className='sidebar-container'>
                        <MineAnnonserSidebar className="sidebar" onChecked={handleSetStatus} />
                    </Box>
                    <Typography variant='h3' sx={{ my: 4, textAlign: 'center', color: "primary.main"}}>
                        Mine Annonser
                    </Typography>

                    <List>


                        {myFilteredAds.map(ad => (

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

                                    {/* <AlertDialog buttonName="Slett annonse" dialogueText="Er du sikker på at du vil slette annonsen?"></AlertDialog> */}
                                    <div className="advertPaperButtons">
                                        <button onClick={async () => {
                                            window.alert("Ikke implementert riktig enda")
                                        }
                                        }>Oppdater annonse</button>
                                        <button onClick={async () => {
                                            const adDoc = doc(firestore, "Advertisement", ad.id);
                                            await deleteDoc(adDoc);
                                            getMyAds();
                                        }}>Slett annonse</button>
                                    </div>
                                </Paper>
                            </Box>
                        ))}
                    </List>
                </Container>
            </div>
        );
    }
    else {
        return <Navigate replace to="/Logg inn"></Navigate>
    }
    
}

export default MyListings;