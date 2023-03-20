import { Container, Paper, Typography } from "@mui/material";
import { Navigate } from "react-router";
import { Link, useNavigate } from "react-router-dom";
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

    const adminSide = () => {
        console.log(userData.Email);
        if (userData.Email === "admin@admin.com") {
            return (<div>
                <Link to={"/Admin Page"}>
                    <button className="adminPageButton"> Admin Side</button>
                </Link>
            </div>
            )
        };
    };

    if (user !== null) {
        return (
            <Container style={{ marginTop: '100px' }}>

                {adminSide()}

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
                            >Lagrede annonser</button>
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