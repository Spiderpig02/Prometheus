import { Box, Button, Container, List, ListItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import AlertDialog from "./AlertDialog";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";
import React, { useEffect, useState } from 'react';
import './AllListings.css';
import CheckboxSidebar, { listCategory } from './CheckboxSidebar.jsx';
import './CheckboxSidebar.css'

export const AllListings = (props) => {

    const [checkedList, setCheckedList] = useState([]);
    const [ads, setAds] = useState([]);
    const adsCollectionRef = collection(firestore, "Advertisement");
    const getAds = async () => {
        await getDocs(adsCollectionRef).then((querySnapshot) => {
            const adsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setAds(adsData);
        });
    }

    const getQueryAds = async () => {
        const querys = query(adsCollectionRef, where('Categories', 'array-contains-any', checkedList))
        await getDocs(querys).then((querySnapshot) => {
            const adsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setAds(adsData);
        })
    };

    useEffect(() => {
        if (checkedList.length !== 0) {
            getQueryAds();
        } else {
            getAds();
        }

    }, [checkedList]);

    const handleSetChecked = (checked) => {
        setCheckedList(checked);
    };

    return (
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
                <input type="text" id="searchField" name="searchField"
                    placeholder="Søk etter annonse..."></input>
                <button id="searchFieldButton">Søk</button>
            </div>

            <List>
                {ads.map(ad => (
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
                            <a href={"https://www.google.com/maps/dir/?api=1&origin=&destination=" + ad.streetName.replace(/\s/g, '+') + "+" + ad.city.replace(/\s/g, '+') + "&travelmode=driving target=_blank"}>Veibeskrivelse</a>
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