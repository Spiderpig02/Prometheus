import { Box, Button, Container, List, ListItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import AlertDialog from "./AlertDialog";
import { useGetAdsFromUser } from "./IO";
const MyListings = (props) => {


  // Dette vil hentes i et json objekt fra firebase, trenger endepunkter
  const currentUser = 4;

  const listingItems = useGetAdsFromUser("Askeladden");

  // 

  return (

    <Container>

      <Typography variant='h3' sx={{ my: 4, textAlign: 'center', color: "primary.main" }}>
        Mine Annonser!
      </Typography>

      <List>
        {listingItems.map(ad => (
          <Box sx={{

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
              <h1>
                Title: {ad.Title}
              </h1>
              <h2>
                Description: {ad.Description}
              </h2>
              <AlertDialog buttonName="Slett annonse" dialogueText="Er du sikker på at du vil slette annonsen?" ></AlertDialog>
            </Paper>

          </Box>


        ))}

      </List>
    </Container>

  );
}

export default MyListings;