import React, {useState} from 'react'
import './LagAnnonse.css'

function LagAnnonse(){
    const [submitting, setSubmitting] = useState(false);
    const submit = event => {
        event.preventDefault();
        setSubmitting(true);
    }
    return (
        <div className='form-content'>
            <h1>Lag annonse eller etterspørsel</h1>

            {submitting &&
                <div>Sender skjema...</div>
            }

            <form onSubmit={submit}>
                <div className='tittel inputElement flexboks'>
                    <label htmlFor="tittel">Tittel:</label>
                    <input placeholder='Tittel' id='tittel' type="text" />
                </div>
                
                <div className='beskrivelse inputElement flexboks'>
                    <label htmlFor="beskrivelse">Beskrivelse:</label>
                    <textarea placeholder='Beskrivelse' id="beskrivelse" rows={5}></textarea>
                </div>
                

                <label htmlFor="type"> Type:</label>
                <div className='inputElement flexboks'>
                    <label htmlFor="type">
                        <input type="radio" value="Annonse" name="type"/> Annonse
                    </label>
                    
                    <label htmlFor="">
                        <input type="radio" value="Etterspørsel" name="type"/> Etterspørsel
                    </label>
                    
                </div>

                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export default LagAnnonse