import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from'react';
import axios from 'axios'

const App = () => {

const [state, setState] = useState(null)
const [isLoading, setIsLoading] = useState(true);

const getData = () =>{
  axios.get('http://localhost:8000/')
    .then(response => {
      console.log(response.data)
      setState(response.data);
      setIsLoading(false);
    })
    .catch(error => console.log(error));
}

function Item({Name, Surname, Age, Gender}) {
  return (
  <div style={{
    display:'flex',
    background:'red',
    flexDirection:'row',
    padding:20,
    justifyContent:'space-between',
    width:'100%'
  }}>
  <p>{Name}</p>
  <p>{Surname}</p>
  <p>{Age}</p>
  <p>{Gender}</p>
  </div>

  )
}

const DataList = ({items}) => {
  return (
   <ul >
     {items.map((item) => 
     <Item Name={item.Name} Surname={item.Surname} Age={item.Age} Gender={item.Gender}/>
     )}
   </ul>
 );
}

useEffect(()=>{
  getData()
}, []);


/* --- JSX --- */
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        {isLoading && <p>Loading...</p>}
        </a>
      </header>
    </div>
  );
}

export default App;
