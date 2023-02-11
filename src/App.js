import './App.css';
import { useInfoFromUser } from './IO';

function App() {

  const unser = useInfoFromUser();

  return (
    <div className="App">
      {unser.map((user) => {
        return <div>
          {" "}
          <h1> Name: {user.Username}</h1>
          <h1> Email: {user.Email}</h1>
        </div>
      })}
    </div>
  );

}

export default App;
