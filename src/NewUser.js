import React from "react"
import NewUser from "./NewUser.css"

function RegisterNewUser() {

    return (
       
        <div className= "ny-bruker-form" style={{marginTop: '100px'}}>
            <form>
                <h1> Registrer ny bruker </h1>
                <div>
                    <label htmlFor="e-post"> E-post (ditt brukernavn): </label>
                    <input type="text" placeholder="E-post" required /> 
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