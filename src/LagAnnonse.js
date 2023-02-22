import { Alert } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { auth } from './firebaseConfig';
import { addAd } from './IO'
import './LagAnnonse.css'

function LagAnnonse() {

    const userData = auth.currentUser;

    const [submitting, setSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const submit = event => {
        event.preventDefault();
        setSubmitting(true);
        addAd(title, description, userData.uid, null, null, userData.phoneNumber, type, null, Timestamp.now())
            .then(alert("Annonsen er laget")).catch(error => {
                alert("En feil har oppstått" + error)
            })
        setTitle("")
        setDescription("")
    }
    return (
        <div className='form-content'>
            <h1>Lag annonse eller etterspørsel</h1>

            <form onSubmit={submit}>
                <div className='tittel inputElement flexboks'>
                    <label htmlFor="tittel">Tittel:</label>
                    <input className="testBox" placeholder='Tittel' name='tittel' id='tittel' type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
                </div>

                <div className='beskrivelse inputElement flexboks'>
                    <label htmlFor="beskrivelse">Beskrivelse:</label>
                    <textarea className="testBox" placeholder='Beskrivelse' id="beskrivelse" rows={5} value={description} onChange={(event) => setDescription(event.target.value)} required></textarea>
                </div>


                <label htmlFor="type"> Type:</label>
                <div className='inputElement flexboks'>
                    <label htmlFor="annonse">Annonse</label>
                    <input type="radio" value="Annonse" id='annonse' onClick={() => setType('Annonse')} /> 
                    

                    <label htmlFor="etterspørsel">Etterspørsel</label>
                    <input type="radio" value="Etterspørsel" id='etterspørsel' onClick={() => setType('Etterspørsel')} />
                    

                </div>

                <button type='submit'>Lag annonse eller etterspørsel</button>
            </form>
        </div>
    )
}

export default LagAnnonse