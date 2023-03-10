import { useState } from "react";
import './LagRating.css'

function LagRating() {

 
    const [value, setRatingValue] = useState('');

    const handleSubmit = (submit) => {
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
    }

    const resetOtherRadio = (radioType) => {
        if (radioType === 'Rating1') {
            document.getElementById("rating2").checked = false;
            document.getElementById("rating3").checked = false;
            document.getElementById("rating4").checked = false;
            document.getElementById("rating5").checked = false;
        } else if (radioType === 'Rating2') {
            document.getElementById("rating1").checked = false;
            document.getElementById("rating3").checked = false;
            document.getElementById("rating4").checked = false;
            document.getElementById("rating5").checked = false;
        }
        else if (radioType === 'Rating3') {
            document.getElementById("rating2").checked = false;
            document.getElementById("rating1").checked = false;
            document.getElementById("rating4").checked = false;
            document.getElementById("rating5").checked = false;
        }
        else if (radioType === 'Rating4') {
            document.getElementById("rating2").checked = false;
            document.getElementById("rating3").checked = false;
            document.getElementById("rating1").checked = false;
            document.getElementById("rating5").checked = false;
        }
        else if (radioType === 'Rating5') {
            document.getElementById("rating2").checked = false;
            document.getElementById("rating3").checked = false;
            document.getElementById("rating4").checked = false;
            document.getElementById("rating1").checked = false;
        }

    }

    return (
        <div className="rating-form" style={{marginTop: "100px"}}>
            <form onSubmit={handleSubmit}>
                <h1> Legg til en rating </h1>
                <div className = "ratingComment">
                    <div className ="commentLabelWrapper">
                        <label className = "commentLabel" htmlFor="kommentar"> Kommentar: </label>
                    </div>
                    <textarea placeholder="Skriv her..." name = "commentInput" rows = "8" cols = "60"></textarea>
                </div>
                
                        <h3 className = "rateTitle">Rate opplevelsen din fra 1-5</h3>
                        <div className = "radioContainer">
                            <div className='radioWrap'>
                                    <label htmlFor="rating1">1</label>
                                    <input type="radio" value="Rating1" id='rating1' onClick={() => { setRatingValue('Rating1'); resetOtherRadio('Rating1'); }} />
                            </div>
                            <div className='radioWrap'>
                                    <label htmlFor="rating2">2</label>
                                    <input type="radio" value="Rating2" id='rating2' onClick={() => { setRatingValue('Rating2'); resetOtherRadio('Rating2'); }} />
                            </div>
                            <div className='radioWrap'>
                                    <label htmlFor="rating3">3</label>
                                    <input type="radio" value="Rating3" id='rating3' onClick={() => { setRatingValue('Rating3'); resetOtherRadio('Rating3'); }} />
                            </div>
                            <div className='radioWrap'>
                                    <label htmlFor="rating4">4</label>
                                    <input type="radio" value="Rating4" id='rating4' onClick={() => { setRatingValue('Rating4'); resetOtherRadio('Rating4'); }} />
                            </div>
                            <div className='radioWrap'>
                                    <label htmlFor="rating5">5</label>
                                    <input type="radio" value="Rating5" id='rating5' onClick={() => { setRatingValue('Rating5'); resetOtherRadio('Rating5'); }} />
                            </div>
                        </div>
                        
                
                <div className = "buttonWrapper">
                    <button className = "ratingButton" class="shadow"> Submit </button>
                </div>
                
            </form>
        </div>
    )
}

export default LagRating;