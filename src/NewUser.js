import React from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { addUser } from './IO.js'
import './NewUser.css';

function RegisterNewUser() {

    const auth = getAuth()

    const handleSubmit = (submit) => {
        submit.preventDefault()

        const email = submit.target.emailInput.value
        const password = submit.target.passwordInput.value
        const phonenumber = submit.target.phonenumberInput.value
        const username = submit.target.usernameInput.value

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log("User created", cred.user)
                addUser(cred.user.uid, username, password, email, phonenumber)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }

    return (
        <div className="ny-bruker-form">
            <form onSubmit={handleSubmit}>
                <h1> Registrer ny bruker </h1>
                <div>
                    <label htmlFor="e-post"> E-post: </label>
                    <input type="text" placeholder="E-post" name="emailInput" required />
                </div>
                <div>
                    <label htmlFor="brukernavn"> Brukernavn: </label>
                    <input type="text" placeholder="Brukernavn" name="usernameInput" required />
                </div>
                <div>
                    <label htmlFor="telefon-nummer"> Telefon nummer: </label>
                    <input type="text" placeholder="Telefon nummer" name="phonenumberInput" required />
                </div>
                <div>
                    <label htmlFor="passord"> Passord: </label>
                    <input type="text" placeholder="Passord" name="passwordInput" required />
                </div>
                <button class="shadow"> Registrer deg! </button>
            </form>
        </div>
    )
}

export default RegisterNewUser;