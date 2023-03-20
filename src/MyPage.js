import { Container, Paper, Typography } from "@mui/material";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, firestore } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import BlockedUserMyPage from "./BlockedUserMyPage";

const MyPage = (props) => {

    const navigate = useNavigate();
    const user = auth.currentUser;
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        async function getData() {
            let userInfo = await getDoc(doc(firestore, "User", user.uid)).
                then(res => {
                    return res.data()
                });
            setUserData(userInfo);
        };
        getData();
    }, []);

    if (user !== null) {
        return (
            <Container style={{ marginTop: '100px' }}>
                <Typography variant='h3' sx={{ my: 4, textAlign: 'center', color: "primary.main" }}>
                    Min Side
                    <Paper>
                        <h3>
                            Brukernavn: {userData.Username}
                        </h3>
                        <h3>
                            Min Rating:
                        </h3>
                        <button onClick={async () =>
                            navigate("/Lagrede Annonser")
                        }
                            class="savedAdsButton" >Lagrede annonser</button>
                        <h3>
                            Annen Statistikk:
                        </h3>

                    </Paper>
                </Typography>
                <BlockedUserMyPage>

                </BlockedUserMyPage>
            </Container>

        );
    }
    else {
        return <Navigate replace to="/Logg inn"></Navigate>
    }

}

export default MyPage;