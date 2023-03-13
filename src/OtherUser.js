import { Button, Container, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import LeaveRating from "./LeaveRating";

const OtherUser = (props) => {

    const userID = props.getuser;



    


    return ( 

        <Container style={{ marginTop: '100px' }}>
                <Typography variant='h3' sx={{ my: 4, textAlign: 'center', color: "primary.main" }}>
                    Annen bruker sin side
                    <Paper>
                        <h3>
                            Telefonnr: props.
                        </h3>
                        <h3>
                            Min Rating:
                        </h3>
                        <h3>
                            {/* {id} */}
                            {props.getuser}
                        </h3>

                    </Paper>
                </Typography>
             
                <Paper>
                <LeaveRating></LeaveRating>
                </Paper>
            </Container>
         


     
      

        
     );
}
 
export default OtherUser;