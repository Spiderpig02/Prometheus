import { Button, Rating } from "@mui/material";
import { useState } from "react";
import './LeaveRating.css'

function LeaveRating() {

    
    const [value, setRatingValue] = useState('');

   /*  const handleSubmit = (submit) => {
        submit.preventDefault()

        const comment = submit.target.commentInput.value

        leaveRating(ratingValue, comment)
            .then((cred) => {
                addRating(ratingValue, comment, value);
            })
            .catch((e) => {
                console.log(e.message)
            })

            window.alert("Ratingen er lagret!")
    } */

    

    return (

        

        <div className="rating-form" style={{marginTop: "100px"}}>

            <h3>
                {value}
            </h3>

            <form onSubmit={console.log("hei")}>  {/* {handleSubmit} */}
                <h1> Legg til en rating </h1>
                <div className = "ratingComment">
                    <div className ="commentLabelWrapper">
                        <label className = "commentLabel" htmlFor="kommentar"> Kommentar: </label>
                    </div>
                    <textarea placeholder="Skriv her..." name = "commentInput" rows = "8" cols = "60"></textarea>
                </div>
                
                <Rating sx={{ marginLeft: 20 }}
                name="simple-controlled"
                onChange={(event, newValue) => {
                setRatingValue(newValue);
    
                }}
                />    
                        
                
                <div className = "buttonWrapper">
                    <Button variant="outlined" onClick={() =>
                        
                         console.log("heisann")} > Submit </Button> {/* Lage onclick og submit + refresh */}
                </div>
                
            </form>
        </div>
        
    )
}

export default LeaveRating;