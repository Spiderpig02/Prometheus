import { doc, getDoc, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, firestore } from './firebaseConfig';
import { addAd, updateAd } from './IO'
import { Navigate } from "react-router";
import './LagAnnonse.css'

function UpdateAd(props) {
    const userData = auth.currentUser;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [available, setAvailable] = useState(true);
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [checked, setChecked] = useState([]);
    const [loanedBy, setLoanedBy] = useState('');
    const [adData, setAdData] = useState([]);
    const [inputBoxAvailable, setInputBoxAvailable] = useState("usynligInput");



    useEffect(() => {
        async function getData() {
            let adInfo = await getDoc(doc(firestore, "Advertisement", props.getAd)).
                then(res => {
                    return res.data();
                });
            setAdData(adInfo);

        };
        getData();
    }, []);

    useEffect(() => {
        setTitle(adData.Title);
        setDescription(adData.Description);
        setStreetName(adData.streetName);
        setCity(adData.city);
        setType(adData.Type)
        setAvailable(adData.Available)
        setLoanedBy(adData.LoanedBy)
        if (adData.Type == "Annonse") {
            document.getElementById("annonse").checked = true;
        } else if (adData.Type == "Etterspørsel") {
            document.getElementById("etterspørsel").checked = true;
        }

        if ((adData.Categories !== undefined) && (adData.Categories !== null)) {
            setChecked(adData.Categories.slice())
        }

        if (adData.Available == true) {
            document.getElementById("no").checked = true;
            setLoanedBy('')
        } else if (adData.Available == false) {
            document.getElementById("yes").checked = true;
        }
    }, [adData]);


    const submit = async event => {
        event.preventDefault();
        try {
            await updateAd(title, description, userData.uid, await getPhone(), type, checked, Timestamp.now(), streetName, city, available, loanedBy, props.getAd)
            if (type === 'Annonse') {
                alert("Annonsen er oppdatert");
            } else if (type === 'Etterspørsel') {
                alert("Etterspørselen er oppdatert");
            }

        } catch (error) {
            alert("En feil har oppstått" + error);
        }
    }

    async function getPhone() {
        const docRef = doc(firestore, "User", userData.uid);
        const noe = (await getDoc(docRef)).data().Phonenumber
        return noe
    }

    const checkList = ["Diverse", "Hageverktøy", "Maleverktøy", "Snekring", "Fritidsverktøy"];

    // Add Remove checked item from list
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };


    // Resets radio buttons on new click

    const resetOtherRadio = (radioType) => {
        if (radioType === 'Annonse') {
            document.getElementById("etterspørsel").checked = false;
        } else if (radioType === 'Ettersporsel') {
            document.getElementById("annonse").checked = false;
        }

    }

    const resetAvailableRadio = (radioType) => {
        if (radioType === 'Ja') {
            document.getElementById("no").checked = false;
            setInputBoxAvailable('synligInput')
        } else if (radioType === 'Nei') {
            document.getElementById("yes").checked = false;
            setLoanedBy('')
            setInputBoxAvailable('usynligInput');
        }

    }


    // Return classes based on whether item is checked

    var isChecked = (item) => {
        if ((checked !== undefined) && (checked !== null)) {
            return checked.includes(item) ? true : false;
        }
        else {
            return false
        }

    }

    if (userData !== null) {
        return (
            <div className='form-content'>

                <h1>Oppdater annonse eller etterspørsel</h1>
                <form onSubmit={submit} id="advertForm">
                    <div className='tittelInputElementFlexboks'>
                        <label htmlFor="tittel">Tittel:</label>
                        <input className="testBox" placeholder='Skriv inn annonsens tittel' name='tittel' id='tittel' type="text" value={title || ''} onChange={(event) => setTitle(event.target.value)} />
                    </div>

                    <div className='beskrivelseInputElementFlexboks'>
                        <label htmlFor="beskrivelse">Beskrivelse:</label>
                        <textarea className="testBox" placeholder='Skriv inn en detaljert beskrivelse av annonsen' id="beskrivelse" rows={5} value={description || ''} onChange={(event) => setDescription(event.target.value)}></textarea>
                    </div>

                    <div className='streetNameInputElementFlexboks'>
                        <label htmlFor="streetName">Gatenavn:</label>
                        <textarea className="testBox" placeholder='Skriv inn gatenavn, eks: Slottsplassen 1' id="streetName" rows={5} value={streetName} onChange={(event) => setStreetName(event.target.value)} ></textarea>
                    </div>

                    <div className='cityInputElementFlexboks'>
                        <label htmlFor="by">City:</label>
                        <textarea className="testBox" placeholder='Skriv inn by, eks: Oslo' id="city" rows={5} value={city} onChange={(event) => setCity(event.target.value)} required></textarea>
                    </div>


                    <div className='checkboxes'>
                        <label htmlFor="type"><h3>Velg ønskede kategorier</h3></label>
                        <div className="list-container">
                            {checkList.map((item, index) => (
                                <div key={index}>
                                    <input value={item} checked={isChecked(item)} type="checkbox" onChange={handleCheck} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
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

                    <div>
                        <p>Er produktet utlånt?</p>
                        <div className='isRentedLabelWrapper'>
                            <label htmlFor="yes">Ja</label>
                            <input type="radio" id="yes" value={false} onClick={() => { setAvailable(false); resetAvailableRadio('Ja'); }} />
                        </div>

                        <div className='isRentedLabelWrapper'>
                            <label htmlFor="no">Nei</label>
                            <input type="radio" id="no" value={true} onClick={() => { setAvailable(true); resetAvailableRadio('Nei'); }} />
                        </div>
                        <div>
                            <input className={`${inputBoxAvailable}`} type="text" placeholder='Skriv inn epost på bruker produktet lånes ut til' id='loanedBy' value={loanedBy} onChange={(event) => setLoanedBy(event.target.value)} />
                        </div>
                    </div>

                    <button type='submit'>Oppdater annonse eller etterspørsel</button>
                </form>
            </div>
        )
    }
}
export default UpdateAd
