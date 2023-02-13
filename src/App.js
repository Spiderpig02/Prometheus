import './App.css';
import { useInfoFromUser } from './IO';
import { getAdsFromUser } from './IO';

function App() {

  const user = useInfoFromUser();
  const ad = getAdsFromUser("Askeladden"); 

  return (
    <div>
      
      <ResponsiveAppBar>
      </ResponsiveAppBar>  
      <Routes>
        <Route path="/" element={<AllListings/>}/>
        <Route path="/Mine Annonser" element={<MyListings/>}/>
        <Route path="/Alle Annonser" element={<AllListings/>}/>
      
      </Routes>  

    

      
    </div>

  
    
  );

}

export default App;
