import { Box, Button, Container, List, ListItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import AlertDialog from "./AlertDialog";
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";
import { getAuth } from "firebase/auth";

export const MyListings = (props) => {

  const auth = getAuth();

  function checkIfUserLoggedIn() {
    const user = auth.currentUser;
    if (user !== null) {
      console.log("a user logged in")
      return true
    }
    console.log("user not logged in")
    return false
  }
  
  const user = auth.currentUser;

  const [myAds, setAds] = useState([]);
  const adsCollectionRef = collection(firestore, "Advertisement");
  const q = query(adsCollectionRef, where("userID", "==", user.uid));

  const getMyAds = async () => {
    await getDocs(q).then((querySnapshot) => {
      const myAdsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setAds(myAdsData);
    });
  }
  
  useEffect(() => {
    getMyAds()
  }, []);

  return (
      
    <Container>

      <Typography variant='h3' sx={{ my: 4, textAlign: 'center', color: "primary.main" }}>
        Mine Annonser!
      </Typography>

      <List>
        {myAds.map(ad => (  
        <Box sx={{
          
          //justifyContent: "space-between",
          margin:"30px",
          mx: 'auto',
          width: 700
          
        }}> 

          <Paper elevation={3} style={{
            padding: 8,
            border: "1px solid black",
            justifyContent:"center",
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
            <AlertDialog buttonName="Slett annonse" dialogueText="Er du sikker på at du vil slette annonsen?" ></AlertDialog>
          </Paper>
          
        </Box>
       
          
        ) ) }
        
      </List>
    </Container>

  );
}

export default MyListings;