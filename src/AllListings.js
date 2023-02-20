import { Box, Button, Container, List, ListItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import AlertDialog from "./AlertDialog";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";
import React, { useEffect, useState } from 'react';

export const AllListings = (props) => {

    const [ads, setAds] = useState([]);
    const adsCollectionRef = collection(firestore, "Advertisement");

    const getAds = async () => {
        await getDocs(adsCollectionRef).then((querySnapshot) => {
            const adsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setAds(adsData);
        });
    }

    useEffect(() => {
        getAds();
    }, []);

    return (
        <Container>

            <Typography variant='h3' sx={{ my: 4, textAlign: 'center', color: "primary.main" }}>
                Alle Annonser
            </Typography>
            <div>
                <input type="text" placeholder="Søk etter annonse.." style={{
                    width: "100px"
                }}></input>
            </div>
            <List>
                {ads.map(ad => (
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
                            <AlertDialog buttonName="Book annonse" dialogueText="Vil du booke denne annonsen?" ></AlertDialog>
                        </Paper>

                    </Box>


                ))}

            </List>
        </Container>

    );
}

export default AllListings;