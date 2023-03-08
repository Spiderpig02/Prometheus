import { Box, Button, Container, List, ListItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import AlertDialog from "./AlertDialog";
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, deleteDoc, getDoc } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";
import { getAuth } from "firebase/auth";
import './MyListings.css'
import { Navigate } from "react-router";

export const MyListings = (props) => {

    useEffect(() => {
        getMyAds()

    }, []);

    const auth = getAuth();
    const user = auth.currentUser;
    const [myAds, setAds] = useState([]);

    

    const getMyAds = async () => {
        await getDocs(query(collection(firestore, "Advertisement"), where("userID", "==", getAuth().currentUser.uid))).then((querySnapshot) => {
            const myAdsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setAds(myAdsData);
        });
    }

    if (user !== null) {
        return (

            <div className="myAdvertsPaperContainer">
                <Container>
                    <Typography variant='h2' sx={{ my: 4, textAlign: 'center', color: "primary.main" }} className="pageHeading">
                        Mine Annonser
                    </Typography>

                    <List>
                        {myAds.map(ad => (
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