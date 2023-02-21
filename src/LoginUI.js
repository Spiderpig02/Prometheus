import './LoginUI.css';
import './LagAnnonse.css';
import React from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { Link } from "react-router-dom"

function LoginUI() {

    const auth = getAuth();

    const handleSubmit = (submit) => {
        submit.preventDefault()

        const email = submit.target.usernameInput.value
        const password = submit.target.passwordInput.value

        signInWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log("user logged in", cred.user)

            })
            .catch((e) => {
                console.log(e.message)
            })

            window.alert("Du er nå logget inn!")
    }

    const handleLogout = (e) => {
        signOut(auth)
            .then(() => {
                console.log("User Logged out")
            })
            .catch((error) => {
                console.log(error.message)
            })
        window.alert("Du er nå logget ut!")
    }

    return (
        <div className="loginForm">
            <form onSubmit={handleSubmit}>
                <div className="inputText">
                    <label htmlFor="title">E-post: </label>
                    <input placeholder="Brukernavn" type="text" name="usernameInput" required />
                </div>
                <div className="inputText">
                    <label>Passord: </label>
                    <input placeholder="Passord" type="password" name="passwordInput" required />
                </div>
                <div className="loginButton">
                    <input type="submit" value={"Logg inn"} />
                </div>
                <div className="newUserLink">
                    <p>Har du ikke bruker fra før?</p>
                    <Link style={{ color: "black" }} to={'/Ny Bruker Side'}>
                        {"Opprett ny bruker her!"}
                    </Link>
                </div>
            </form>
            <div className="logoutButton">
                <button class="shadow" type="button" onClick={handleLogout}>Logg ut</button>
            </div>
        </div>
        
    );
}

export default LoginUI;