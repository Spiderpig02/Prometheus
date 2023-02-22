import { Box, Button, Container, List, ListItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import AlertDialog from "./AlertDialog";
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, deleteDoc, getDoc } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";
import { getAuth } from "firebase/auth";
import './MyListings.css'

export const MyListings = (props) => {

  useEffect(() => {
    getMyAds()
    
  }, []);

 
  const [myAds, setAds] = useState([]);

  const getMyAds = async () => {
    await getDocs(query(collection(firestore, "Advertisement"), where("userID", "==", getAuth().currentUser.uid))).then((querySnapshot) => {
      const myAdsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setAds(myAdsData);
      console.log(getMyAds);
    });
  }
    return (

        <Container>

            <Typography variant='h3' sx={{ my: 4, textAlign: 'center', color: "primary.main" }}>
                Mine Annonser!
            </Typography>

            <List>
                {myAds.map(ad => (
                    <Box sx={{

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
                            <h1>
                                Title: {ad.Title}
                            </h1>
                            <h2>
                                Description: {ad.Description}
                            </h2>
                            <h2>
                                userID: {ad.userID}
                            </h2>


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
    );
}

export default MyListings;