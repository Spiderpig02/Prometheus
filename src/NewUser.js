import React from "react"
import NewUser from "./NewUser.css"

function RegisterNewUser() {

    return (
       
        <div className= "ny-bruker-form">
            <form>
                <h1> Registrer ny bruker </h1>
                <div>
                    <label htmlFor="e-post"> E-post: </label>
                    <input type="text" placeholder="E-post" required /> 
                </div>
                <div>
                    <label htmlFor="brukernavn"> Brukernavn: </label>
                    <input type="text" placeholder="Brukernavn" required /> 
                </div>
                <div>
                    <label htmlFor="telefon-nummer"> Telefon nummer: </label>
                    <input type="text" placeholder="Telefon nummer" required /> 
                </div>
                <div>
                    <label htmlFor="passord"> Passord: </label>
                    <input type="text" placeholder="Passord" required /> 
                </div>
                    <button class="shadow"> Registrer deg! </button>
            </form>
        </div>
    )
}

export default RegisterNewUser