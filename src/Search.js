import React, {useEffect, useState} from 'react'
import axios from './axios';
import requests from './requests'




   

function Search() {

    const [search, setSearch] =useState('')
     const [found, setFound] = useState([])


const findMovie =() =>{
    axios.get(requests.searchURL+ search)
    .then(response => setFound(response.data.results))
    setSearch("")
  }


 useEffect(()=>{
    axios.get(requests.searchURL+ search)
    .then(response => setFound(response.data.results))
 }, [search])


console.log(found)
    return (
        <div>
            <input value={search} onChange={(e)=>setSearch( e.target.value)} /> <button onClick={findMovie}>search</button>
            <div>
                {found.map((movies, index) => 
                index < 6 ?
                <div> 
                    <img width="100" src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}/>
                     <p>{movies.original_title}</p>
                </div>
               
                : ""
                )}
            </div>
        </div>
    )
}

export default Search
