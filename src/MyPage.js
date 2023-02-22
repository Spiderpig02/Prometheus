import { Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

const MyPage = () => {
    return ( 
    
    <Container style={{marginTop: '100px'}}>
        <Typography variant='h3' sx={{ my: 4, textAlign: 'center', color: "primary.main" }}>
        Min Side
            <Paper>
                <h3>
                    Brukernavn: 
                </h3>
                <h3>
                    Min Rating: 
                </h3>
                <h3>
                    Annen Statistikk: 
                </h3>
                
            </Paper>
        </Typography>
    </Container>
    
   
     );
}
 
export default MyPage;