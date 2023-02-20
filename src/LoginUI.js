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

    return (
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
            </form>
        <div className = "logoutButton">
        <button type="button" onClick={handleLogout}>Logout</button>
        </div>
        </div>  
    );
}

export default LoginUI;