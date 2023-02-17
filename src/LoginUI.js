import { useState } from "react";

import React from "react";
import './LoginUI.css';

function LoginUI() {
    const[isSubmitted, setIsSubmitted] = useState(false);
    const[errorMessages, setErrorMessages] = useState({});

    //login info
    const database = [
        {
            usernameLogin: "userA",
            passwordLogin: "test1"
        },
        {
            usernameLogin: "userB",
            passwordLogin: "test2"
        }
    ];

    const handleSubmit = (submit) => {
        submit.preventDefault();

        var {usernameLogin, passwordLogin} = document.forms[0];

        //finding user info in database
        const userData = database.find((user) => user.username == usernameLogin.value);

        //comparing user data to database info
        if (userData) {
            if (userData.password != passwordLogin.value) {
                setErrorMessages({name: "passwordLogin", message: errorMessages.passwordLogin});
            } else {
                setIsSubmitted(true);
            }
        } else {
            setErrorMessages({name: "usernameLogin", message: errorMessages.usernameLogin});
        }
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
                    <input placeholder = "Username" type="text" name = "usernameLogin" required />
                    {giveErrorMessage("usernameLogin")}
                </div>
                <div className="inputText">
                    <label>Passord: </label>
                    <input placeholder = "Password" type="password" name="passwordLogin" required/>
                    {giveErrorMessage("passwordLogin")}
                </div>
                <div className = "loginButton">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="LoginUI">
            <div className="loginForm">
                {/* <div className = "title">Log In</div> */}
                <h1>Log In</h1>
                {isSubmitted ? <div>You have successfully logged in! </div> : giveForm}
            </div>
        </div>
    );
}

export default LoginUI;