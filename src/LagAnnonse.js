import React, {useState} from 'react'
import CheckboxSidebar from './CheckboxSidebar';
import IO, { addAd } from './IO'
import './LagAnnonse.css'

function LagAnnonse(){
    const [submitting, setSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const submit = event => {
        event.preventDefault();
        setSubmitting(true);
        addAd(title, description, null, null, null)
        .then(alert("Annonsen er laget")).catch(error => {
            alert("En feil har oppstått")
        })
        setTitle("")
        setDescription("")
    }
    /*
    const [checked, setChecked] = useState(false);
    const onChange = () => {
        setChecked(!checked);
    };
    */
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
                <div className='tittel inputElement flexboks'>
                    <label htmlFor="tittel">Tittel:</label>
                    <input className="testBox" placeholder='Tittel' id='tittel' type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
                </div>
                
                <div className='beskrivelse inputElement flexboks'>
                    <label htmlFor="beskrivelse">Beskrivelse:</label>
                    <textarea className="testBox" placeholder='Beskrivelse' id="beskrivelse" rows={5} value={description}  onChange={(event) => setDescription(event.target.value)} ></textarea>
                </div>
                

                <label htmlFor="type"> Type:</label>
               <div className='checkboxes'>
                    <h3>Velg ønskede kategorier</h3> 
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
                <div className='inputElement flexboks'>
                    <label htmlFor="type">
                        <input type="radio" value="Annonse" name="type" onClick={() => setType('Annonse')} /> Annonse
                    </label>
                    
                    <label htmlFor="">
                        <input type="radio" value="Etterspørsel" name="type" onClick={() => setType('Etterspørsel')}/> Etterspørsel
                    </label>
                    
                </div>

                <button type='submit'>Lag annonse eller etterspørsel</button>
            </form>
        </div>
    )
}

export default LagAnnonse