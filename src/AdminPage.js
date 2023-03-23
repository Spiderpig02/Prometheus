import React, { useState, useEffect } from 'react';
import { Box, Button, Container, List, ListItem, Paper } from "@mui/material";
import { auth, firestore } from "./firebaseConfig.js";
import { getDocs, collection, doc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import { where, query } from 'firebase/firestore';
import './AdminPage.css'


function AdminPage() {
    const [users, setUsers] = useState([]);
    const [ads, setAds] = useState([]);
    const userCollectionRef = collection(firestore, "User");
    const adsCollectionRef = collection(firestore, "Advertisement");

    const getAds = async () => {
        await getDocs(adsCollectionRef).then((querySnapshot) => {
            const adsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setAds(adsData);
        });
    }

    const getUsers = async () => {
        await getDocs(userCollectionRef).then((querySnapshot) => {
            const userData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setUsers(userData);
        });
        console.log("hei")
    }

    useEffect(() => {
        getAds();
        getUsers();
    }, []);



    // const deleteAds = async (targetUserID) => {
    //     await getDocs(adsCollectionRef).then((querySnapshot) => {
    //         const adsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //         adsData.forEach(async element => {
    //             console.log(element)
    //             if(element.userID == targetUserID) {
    //                 const adDoc = doc(firestore, "Advertisement", doc.id);
    //                 await deleteDoc(adDoc);
    //             }
    //             });
    //     });
    // }

    const deleteAds = async (targetUserID) => {
        await getDocs(query(collection(firestore, "Advertisement"), where("userID", "==", targetUserID)))
            .then((querySnapshot) => {
                const targetAdsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                targetAdsData.map(async ad => {
                    await deleteDoc(doc(firestore, "Advertisement", ad.id));
                })
            })
    }

    return (
        <div>
            <h1 className="adminTitle">Velkommen, Admin!</h1>
            <Container class="container">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="container-list" style={{ display: "flex", width: "100%", maxWidth: "1400px" }}>
                        <List className="left-list" style={{ flex: "1" }}>
                            <h2 className="listTitle">Brukere</h2>

                            {users.filter((u) => u.Email !== "admin@admin.com").map(user => (
                                <Box key={user.id} sx={{

                                    //justifyContent: "space-between",
                                    margin: "30px",
                                    mx: 'auto',
                                    width: 650,
                                    height: "auto"
                                }}>

                                    <Paper elevation={3} style={{
                                        padding: 8,
                                        border: "1px solid black",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                        height: "100%"
                                    }}>
                                        <h4 className="userName">
                                            {user.Username}
                                        </h4>
                                        <div className="userEmail">
                                            <h1>
                                                {user.Email}
                                            </h1>
                                        </div>
                                        <h3>
                                            {user.Phonenumber}
                                        </h3>
                                        <div className="advertPaperButtons">
                                            <button onClick={async () => {
                                                const userDoc = doc(firestore, "User", user.id);
                                                deleteAds(user.id);
                                                await deleteDoc(userDoc);
                                                getUsers();
                                                getAds();
                                            }}>Slett bruker</button>
                                        </div>
                                    </Paper>
                                </Box>
                            ))}
                        </List>
                        <div className="listSeparator"></div>
                        <List className="right-list" style={{ flex: "1" }}>
                            <h2 className="listTitle">Annonser</h2>
                            {ads.map(ad => (

                                <Box key={ad.id} sx={{

                                    //justifyContent: "space-between",
                                    margin: "30px",
                                    mx: 'auto',
                                    width: 650,
                                    height: "auto"
                                }}>

                                    <Paper elevation={3} style={{
                                        padding: 8,
                                        border: "1px solid black",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                        height: "100%"
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
                                        <div className="advertPaperButtons">
                                            <button onClick={async () => {
                                                const adDoc = doc(firestore, "Advertisement", ad.id);
                                                await deleteDoc(adDoc);
                                                getAds();
                                            }}>Slett annonse</button>
                                        </div>
                                    </Paper>
                                </Box>
                            ))}
                        </List>
                    </div>
                </div>
            </Container>
        </div>



    );
}

export default AdminPage;