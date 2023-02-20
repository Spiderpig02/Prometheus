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
                    <input className="testBox" placeholder='Tittel' id='tittel' type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>

                <div className='beskrivelse inputElement flexboks'>
                    <label htmlFor="beskrivelse">Beskrivelse:</label>
                    <textarea className="testBox" placeholder='Beskrivelse' id="beskrivelse" rows={5} value={description} onChange={(event) => setDescription(event.target.value)} ></textarea>
                </div>


                <label htmlFor="type"> Type:</label>
                <div className='inputElement flexboks'>
                    <label htmlFor="type">
                        <input type="radio" value="Annonse" name="type" onClick={() => setType('Annonse')} /> Annonse
                    </label>

                    <label htmlFor="">
                        <input type="radio" value="Etterspørsel" name="type" onClick={() => setType('Etterspørsel')} /> Etterspørsel
                    </label>

                </div>

                <button type='submit'>Lag annonse eller etterspørsel</button>
            </form>
        </div>
    )
}

export default LagAnnonse