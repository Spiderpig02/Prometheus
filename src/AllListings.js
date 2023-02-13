
import { Box, Button, Container, List, ListItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import AlertDialog from "./AlertDialog";
const AllListings = (props) => {


// Dette vil hentes i et json objekt fra firebase, trenger endepunkter
const currentUser = 4;


const listingItems = [
  {
    text: "placeholder",
    id:1,
    userID:1

  },
  {
    text:"placeholder2",
    id:2,
    userID:2

  },

  {
    text:"placeholder2",
    id:3,
    userID:3

  },
  {
    text:"placeholder2",
    id:4,
    userID:4

  },
  {
    text:"placeholder2",
    id:5,
    userID:4
  }

]
// 

    return (
    <Container>

      <Typography variant='h3' sx={{ my:4, textAlign:'center', color: "primary.main"}}>
      Alle Annonser
      </Typography>
    
      <List>
        {listingItems.map(item => (  
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
            <h2>
              Id: {item.id} 
            </h2>
            <h2>
              Tekst: {item.text}
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