import { Box, Container, List, Paper } from "@mui/material";
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
        <Container className="ListingsContainer" sx={{ justifyContent: 'center', display: 'flex', padding: 0, paddingLeft: 0 }}>
            <Box className='sidebar-container'>
                <CheckboxSidebar className="sidebar"/>            
            </Box>
            <Box className='mainContent'sx={{ maxWidth: 700, margin: "0 auto"}}>
                <Typography variant='h3' sx={{ my: 4, textAlign: "center", color: "primary.main" }}>
                    Alle Annonser
                </Typography>
                <List>
                    {ads.map(ad => (
                        <Box sx={{

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
            </Box>
        </Container>
    );
}

export default AllListings;