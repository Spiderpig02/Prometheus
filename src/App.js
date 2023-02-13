import './App.css';
import { useInfoFromUser } from './IO';
import { getAdsFromUser } from './IO';

function App() {

  const user = useInfoFromUser();
  const ad = getAdsFromUser("Askeladden"); 

  return (
    <div className="App">
      {ad.map((ad) => {
        return <div>
          {" "}
          <h1> UserID: {ad.userID} </h1>
          <h1> Title: {ad.Title} </h1>
          <h1> Beskrivelse: {ad.Beskrivelse} </h1>
          </div>
      })}
    </div>
  );

}

export default App;