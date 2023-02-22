import { async } from '@firebase/util';
import { Alert } from '@mui/material';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { auth, firestore } from './firebaseConfig';
import { addAd } from './IO'
import './LagAnnonse.css'

function LagAnnonse() {

    const userData = auth.currentUser;

    const [submitting, setSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const submit = async event => {
        event.preventDefault();
        setSubmitting(true);
        try {
            await addAd(title, description, userData.uid, null, null, await getPhone(), type, checked, Timestamp.now())
            alert("Annonsen er laget");
            
        } catch (error) {
            alert("En feil har oppstått. LOG INN" + error);
        }
        
        setTitle("")
        setDescription("")
    }

    async function  getPhone() {
        const docRef = doc(firestore, "User", userData.uid);
        const noe = (await getDoc(docRef)).data().Phonenumber
        return noe
        
    }

    const [checked, setChecked] = useState([]);
    const checkList = ["Diverse", "Hageverktøy", "Maleverktøy", "Snekring", "Fritidsverktøy"];

    // Add/Remove checked item from list
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    // Return classes based on whether item is checked
    var isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";
    return (
        <div className='form-content'>
            <h1>Lag annonse eller etterspørsel</h1>
            <form onSubmit={submit}>
                <div className='tittelInputElementFlexboks'>
                    <label htmlFor="tittel">Tittel:</label>
                    <input className="testBox" placeholder='Skriv inn annonsens tittel' name='tittel' id='tittel' type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
                </div>

                <div className='beskrivelseInputElementFlexboks'>
                    <label htmlFor="beskrivelse">Beskrivelse:</label>
                    <textarea className="testBox" placeholder='Skriv inn en detaljert beskrivelse av annonsen' id="beskrivelse" rows={5} value={description} onChange={(event) => setDescription(event.target.value)} required></textarea>
                </div>

                <div className='checkboxes'>
                    <label htmlFor="type"><h3>Velg ønskede kategorier</h3></label>
                    <div className="list-container">
                        {checkList.map((item, index) => (
                            <div key={index}>
                                <input value={item} type="checkbox" onChange={handleCheck} />
                                <span className={isChecked(item)}>{item}</span>
                            </div>
                        ))}
                    </div>
                    {/* <h3>Velg ønskede kategorier</h3>
                        <div className='sidebar-checkbox'>
                            <input id="verktøyDiverse" type="checkbox" value={checked} onChange={onChange}/>
                            <label htmlFor="verktøyDiverse">Diverse</label>         
                        </div>
                        <div className='sidebar-checkbox'>
                            <input id="verktøyHage" type="checkbox" value={checked} onChange={onChange}/>
                            <label htmlFor="verktøyHage">Hageverktøy</label>  
                        </div>
                        <div className='sidebar-checkbox'>
                            <input id="verktøyMaling" type="checkbox" value={checked} onChange={onChange}/>
                            <label htmlFor="verktøyMaling">Maleverktøy</label>  
                        </div>
                        <div className='sidebar-checkbox'>
                            <input id="verktøySnekring" type="checkbox" value={checked} onChange={onChange}/>
                            <label htmlFor="verktøySnekring">Snekring</label>  
                        </div>
                        <div className='sidebar-checkbox'>
                            <input id="verktøyFritid" type="checkbox" value={checked} onChange={onChange}/>
                            <label htmlFor="verktøyFritid">Fritidsverktøy</label>  
                    </div>   */}
                </div>
                <div className='annonseEttersporselInputElementFlexboks'>
                    <div className='annonseRadioWrap'>
                        <label htmlFor="annonse">Annonse</label>
                        <input type="radio" value="Annonse" id='annonse' onClick={() => setType('Annonse')} />
                    </div>
                    <div className='ettersporselRadioWrap'>
                        <label htmlFor="etterspørsel">Etterspørsel</label>
                        <input type="radio" value="Etterspørsel" id='etterspørsel' onClick={() => setType('Etterspørsel')} />
                    </div>

                </div>

                <button type='submit'>Lag annonse eller etterspørsel</button>
            </form>
        </div>
    )
}

export default LagAnnonse