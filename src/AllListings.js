import { Box, Button, Container, List, ListItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import AlertDialog from "./AlertDialog";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";
import React, { useEffect, useState } from 'react';
import './AllListings.css';

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
            <div className="searchBar">
                <input type="text" id="searchField" name="searchField"
                    placeholder="Søk etter annonse..."></input>
                <button id="searchFieldButton">Søk</button>
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
                            <h2>
                                Kontakt: {ad.Phonenumber}
                            </h2>
                        </Paper>
                    </Box>
                ))}

            </List>
        </Container>

    );
}

export default AllListings;