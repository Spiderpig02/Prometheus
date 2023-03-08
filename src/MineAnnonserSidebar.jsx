import { useState } from "react";
import './CheckboxSidebar.css'

function CheckboxSidebar(props) {

  const checkList = ["Tilgjengelig", "Utlånt"];  
    // 
    const [checked, setChecked] = useState([]);

    function getMyFilteredList() {
        props.onChecked(checked);
      };

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
  var isChecked = () => {
    getMyFilteredList();
  };

  return (
    <div style={{ border: '1px solid black' }} className='sidebar-box'>
      <div className='sidebar-content'>
        <h3>Velg status</h3>
        <div className="list-container">
          {checkList.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item)}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default CheckboxSidebar