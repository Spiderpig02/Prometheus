import React from "react"
import NewUser from "./NewUser.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

function RegisterNewUser() {

    const auth = getAuth()

    const handleSubmit = (submit) => {
        submit.preventDefault()

        const email = submit.target.emailInput.value
        const password = submit.target.passwordInput.value

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log("User created", cred.user)
                
            })
            .catch((e) => {
                console.log(e.message)
            })
    }

    return (
       
        <div className= "ny-bruker-form">
            <form onSubmit={handleSubmit}>
                <h1> Registrer ny bruker </h1>
                <div>
                    <label htmlFor="e-post"> E-post: </label>
                    <input type="text" placeholder="E-post" name="emailInput" required /> 
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

export default RegisterNewUser