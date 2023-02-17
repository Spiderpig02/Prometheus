
import { Box, Button, Container, List, ListItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import AlertDialog from "./AlertDialog";
import { useAllAds } from "./IO";
const AllListings = (props) => {


// Dette vil hentes i et json objekt fra firebase, trenger endepunkter
const currentUser = 4;


const listingItems = useAllAds();

// 

    return (
    <Container>

      <Typography variant='h3' sx={{ my:4, textAlign:'center', color: "primary.main"}}>
      Alle Annonser
      </Typography>
    
      <List>
        {listingItems.map(ad => (  
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
            <AlertDialog buttonName="Book annonse" dialogueText="Vil du booke denne annonsen?" ></AlertDialog>
          </Paper>
          
        </Box>
       
          
        ) ) }
        
      </List>
    </Container>

      );
}
 
export default AllListings;