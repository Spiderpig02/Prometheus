import { Container, Paper, Typography, List, Box } from "@mui/material";
import { Navigate } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, firestore } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import BlockedUserMyPage from "./BlockedUserMyPage";
import "./MyPage.css";


const MyPage = (props) => {

    const navigate = useNavigate();
    const user = auth.currentUser;
    const [userData, setUserData] = useState([]);
    const [rating, setRating] = useState()
    const [comments, setComments] = useState([])

    async function getData() {
        let userInfo = await getDoc(doc(firestore, "User", user.uid)).
            then((res) => {
                if (res.data().Rating.length > 0) {
                    setRating(Math.round(res.data().totalRating / res.data().Rating.length * 10) / 10)
                    setComments(res.data().Rating)
                } else {
                    setRating("Ingen vurderinger")
                    setComments([])
                }
                return res.data()
            });
        setUserData(userInfo);
    };

    useEffect(() => {
        getData();
    }, []);

    const adminSide = () => {
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
                            Min Rating: {rating}
                        </h3>
                        <button onClick={async () =>
                            navigate("/Lagrede Annonser")
                        } className="NavigateToMyLiked"
                        >Lagrede annonser</button>

                    </Paper>
                </Typography>
                <h2>Vurderinger av deg</h2>
                <List className="userDivWrapper">
                    {comments.map(rating => (
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