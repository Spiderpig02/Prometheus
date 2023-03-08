import { Container, Paper, Typography } from "@mui/material";
import { useParams } from "react-router";

const OtherUser = (props) => {




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
            </Container>

     
      

        
     );
}
 
export default OtherUser;