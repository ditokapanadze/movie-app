import React, {useState, useEffect} from 'react'
import './App.css';
import Row from './Row'
import Banner from './Banner'
import Nav from './Nav'
import requests from './requests'
import UserContext from "./UserContext";
import axios from './axios';
const token = localStorage.getItem('token');

function App() {
  const [currentUser, setCurrentUser] = useState({token});
  const [search, setSearch] =useState('')
   console.log(token)
  const findMovie =() =>{
    axios.get(requests.search+ search)
    .then(response => console.log(response))
  }
   
  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
    <div className="app">

      <Nav/>
      <Banner/>
      <input onChange={(e)=>setSearch( e.target.value)} /> <button onClick={findMovie}>search</button>
      <Row title="NETFLIX ORIGINAL" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending now" fetchUrl={requests.fetchTrending}/>
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} /> 
    
    </div>
    </UserContext.Provider>

  );
}

export default App;
