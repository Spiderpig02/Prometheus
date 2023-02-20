import './LoginUI.css';
import React from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"

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
    }

    const handleLogout = (e) => {
        signOut(auth)
        .then(() => {
            console.log("User Logged out")
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    const giveErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className = "loginError">{errorMessages.message}</div>
        );
    

    const giveForm = (
        <div className="loginForm">
            <form onSubmit={handleSubmit}>
                <div className="inputText">
                    <label htmlFor = "title">Brukernavn: </label>
                    <input placeholder = "Brukernavn" type="text" name="usernameInput" required />
                </div>
                <div className="inputText">
                    <label>Passord: </label>
                    <input placeholder = "Passord" type="password" name="passwordInput" required/>
                </div>
                <div className = "loginButton">
                    <input type="submit" />
                </div>
                <div className = "newUserLink">
                    <Link style = {{color: "black"}} to={'/Ny Bruker Side'}>
                        {"Opprett ny bruker!"}
                    </Link>
                </div>
                <div>
                {/* <button class="linkNewUser">
                    <Link to= {'/Ny Bruker Side'}>
                        {"Opprett Ny Bruker!"}
                    </Link>
                </button> */}
                </div>
            </form>
        <div className = "logoutButton">
        <button type="button" onClick={handleLogout}>Logout</button>
        </div>
    );

    return (
        <div className="LoginUI">
            <div className="loginForm">
                {/* <div className = "title">Log In</div> */}
                <h1>Logg Inn</h1>
                {isSubmitted ? <div>You have successfully logged in! </div> : giveForm}
            </div>
        </div>
    );
}

export default LoginUI;