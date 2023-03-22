import { Box, Button, Container, List, ListItem, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";
import './MyListings.css'
import { Navigate } from "react-router";
import LeaveRating from "./LeaveRating.js";
import { getAuth } from "firebase/auth";

const OtherUser = (props) => {
    console.log(props.getuser)
    const otherUserUID = props.getuser;
    const userDocRef = doc(firestore, "User", otherUserUID)

    const [username, setUsername] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState([]);
    const [totalRating, setTotalRating] = useState();

    const getUserInfo = async () => {
        await getDoc(userDocRef).then((documentSnapshot) => {
            setUsername(documentSnapshot.data().Username)
            setPhonenumber(documentSnapshot.data().Phonenumber)
            setEmail(documentSnapshot.data().Email)
            setRating(documentSnapshot.data().Rating)
            setTotalRating(documentSnapshot.data().totalRating)
        })
    }
    
    useEffect(() => {
        getUserInfo()
    }, []);

    if (totalRating > 0) {
        return ( 
            <Container style={{ marginTop: '100px' }}>
                    <Typography variant='h3' sx={{ my: 4, textAlign: 'center', color: "primary.main" }}>
                        <div>
                            <h4>
                                Brukernavn: {username}
                            </h4>
                            <h4>
                                Email: {email}
                            </h4>
                            <h4>
                                Telefonnr: {phonenumber}
                            </h4>
                            <h3>
                                Rating: {Math.round(totalRating/rating.length * 10) / 10}
                            </h3>
                            <List>
                            {rating.map(rating => (
                                <Box key={rating} sx={{
    
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
                                            {rating.username}
                                        </h4>
                                        <div className="paperTitleAndDate">
                                            <h1>
                                                {rating.comment}
                                            </h1>
                                        </div>
                                        <h3>
                                            Vurdering: {rating.rating}
                                        </h3>                                  
                                    </Paper>
                                </Box>
                            ))}
                        </List>
                        <LeaveRating userID={otherUserUID}></LeaveRating>
    
                        </div>
                    </Typography>
    
                </Container>
         );
    } else {
        return ( 
            <Container style={{ marginTop: '100px' }}>
                    <Typography variant='h3' sx={{ my: 4, textAlign: 'center', color: "primary.main" }}>
                        Annen bruker sin side
                        <div>
                            <h4>
                                Brukernavn: {username}
                            </h4>
                            <h4>
                                Email: {email}
                            </h4>
                            <h4>
                                Telefonnr: {phonenumber}
                            </h4>
                            <h3>
                                Rating: Ingen vurderinger
                            </h3>
                        <LeaveRating userID={otherUserUID}></LeaveRating>
    
                        </div>
                    </Typography>
    
                </Container>
         );
    }
    
}

export default OtherUser;