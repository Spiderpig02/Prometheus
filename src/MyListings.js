import { Box, Button, Container, List, ListItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import AlertDialog from "./AlertDialog";
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, deleteDoc, getDoc } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";
import { getAuth } from "firebase/auth";
import './MyListings.css'
import { Navigate } from "react-router";
import MineAnnonserSidebar, { listCategory } from './MineAnnonserSidebar.jsx';
import './MineAnnonserSidebar.css'

export const MyListings = (props) => {

    const auth = getAuth();
    const user = auth.currentUser;
    const [myAds, setAds] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [myFilteredAds, setMyFilteredAds] = useState([]);
    
    useEffect(() => {
        if (myAds.length === 0) {
            getMyAds()
        }
        filter();

    }, [statusList]);

    const handleSetStatus = (checked) => {
    setStatusList(checked);
    getMyAds(checked);
    };
    
    const getMyAds = async () => {
        await getDocs(query(collection(firestore, "Advertisement"), where("userID", "==", getAuth().currentUser.uid)))
        .then((querySnapshot) => {
        const myAdsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setAds(myAdsData);
        }); }

        const filter = () => {
            myFilteredAds.forEach(element => {
                myFilteredAds.pop(element);
            });
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



                // if (myAds[index].Available === false) {
                //     if (!(statusList.length === 1 && statusList[0] === "Tilgjengelig")) {
                //         myFilteredAds.push(myAds[index])
                //         console.log(myAds[index])
                //     }
                // }
                // if (myAds[index].Available === true) {
                //     if (!(statusList.length === 1 && statusList[0] === "Utlånt")) {
                //         myFilteredAds.push(myAds[index])
                //         console.log(myAds[index])
                //     }
                // }
                
            }
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











 // const adsCollectionRef = collection(firestore, "Advertisement");

    
    // const [checkedList, setCheckedList] = useState([]);

    // const getMyQueryAds = async () => {
    //     const querys = query(adsCollectionRef, where('Categories', 'array-contains-any', checkedList))
    //     await getDocs(querys).then((querySnapshot) => {
    //         const adsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //         setAds(adsData);
    //     })
    // };

    // useEffect(() => {
    //     if (checkedList.length !== 0) {
    //         getMyQueryAds();
    //     } else {
    //         getMyAds();
    //     }

    // }, [checkedList]);

    // const handleSetChecked = (checked) => {
    //     setCheckedList(checked);
    // };