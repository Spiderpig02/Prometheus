import { doc, getDoc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { auth, firestore } from './firebaseConfig';
import { addAd } from './IO'
import { Navigate } from "react-router";
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
            if (type === 'Annonse') {
                alert("Annonsen er publisert");
            } else if (type === 'Etterspørsel') {
                alert("Etterspørselen er publisert");
            }
            formSubmitReset();
            setChecked([]);

        } catch (error) {
            alert("En feil har oppstått. LOG INN" + error);
        }

        setTitle("")
        setDescription("")
    }

    async function getPhone() {
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

    // Resets form after submit
    const formSubmitReset = () => {
        document.getElementById('advertForm').reset();
    }

    // Resets radio buttons on new click

    const resetOtherRadio = (radioType) => {
        if (radioType === 'Annonse') {
            console.log('Unchecked etterspørsel')
            document.getElementById("etterspørsel").checked = false;
        } else if (radioType === 'Ettersporsel') {
            console.log('Unchecked etterspørsel')
            document.getElementById("annonse").checked = false;
        }

    }

    // Return classes based on whether item is checked
    var isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";
    if (userData !== null) {
        return (
            <div className='form-content'>
                <h1>Lag annonse eller etterspørsel</h1>
                <form onSubmit={submit} id="advertForm">
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
                            <input type="radio" value="Annonse" id='annonse' onClick={() => { setType('Annonse'); resetOtherRadio('Annonse'); }} />
                        </div>
                        <div className='ettersporselRadioWrap'>
                            <label htmlFor="etterspørsel">Etterspørsel</label>
                            <input type="radio" value="Etterspørsel" id='etterspørsel' onClick={() => { setType('Etterspørsel'); resetOtherRadio('Ettersporsel'); }} />
                        </div>

                    </div>

                    <button type='submit'>Publiser annonse eller etterspørsel</button>
                </form>
            </div>
        )

    } else {
        return <Navigate replace to="/Logg inn"></Navigate>
    }
}

export default LagAnnonse