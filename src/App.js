import './App.css';
import CounterPage from './components/CounterPage';

import { useState } from "react";

function App() {
   const [countries, setCountries] = useState([]);
  return (
    <div className="App">
     <CounterPage/>
    
    </div>
  );
}

export default App;
