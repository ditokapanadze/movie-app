import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import axios from './axios'
import requests from './requests'
import Youtube from "react-youtube"
import movieTrailer from "movie-trailer"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import './moviePage.css'

const API_KEY = "0b753f6cb66d441479c1e758d1f8f62e"


function MoviePage() {
    let { params } = useParams();
    const [trailerUrl, setTrailerUrl] = useState("")
    const [movie, setMovie] = useState([])
    const [cast, setCast] = useState([])  
    const [crew, setCrew] = useState([])  
   const [director, setDirector] = useState([])
    const [similar, setSimilar] = useState([])

    useEffect(() =>{
           async function fetchData (){
               const request = await axios.get(`/movie/${params}?api_key=${API_KEY}`)
              return setMovie(request.data)
    }
    fetchData ()

    

    const trailer = async (movie) => {
        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          let trailerurl = await axios.get(
            `/movie/${params}/videos?api_key=fb34530271b349314af0de263d16ab5a`
          );
          setTrailerUrl(trailerurl.data.results[0]?.key);
        }
      };
          trailer ()
       
     }, [])
    useEffect(() =>{
           async function fetchData (){
               const request = await axios.get(`/movie/${params}/credits?api_key=${API_KEY}`)
              return (setCast(request.data.cast), setCrew(request.data.crew) )
    }
    fetchData ()
       
     }, [])

 useEffect(()=>{
    crew.map(crewMember =>{if (crewMember.known_for_department == "Directing"){
       
        setDirector([crewMember.name])
        // director.map(d =>{
        //    if (d !== crewMember.name){
        //        setDirector([crewMember.name])
        //        console.log(director)
        //    }
        // })
     }})
 }, [])
    //  const findDirector = () =>{
    //      crew.map(crewMember =>{if (crewMember.known_for_department === "Directing"){
    //         setDirector([...crewMember.name])
    //      }})
    //  } 

     const imdb = movie.imdb_id
  
     const opts = {
        height: "390",
        width: "30%",
        playerVars: {
          autoplay: 0,
        },
      };

   
    useEffect(()=>{
        axios.get(`movie/${params}/similar?api_key=${API_KEY}`)
        .then(response => setSimilar(response.data.results))
        
    }, [])
    console.log(similar)
  
    return (
        <div className="movie-page">
            <img className="poster" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}/>
          <h1 className="movie-page-title">{movie.title}</h1>
          <p className="overview">{movie.overview}</p>
          <p>Genre: {movie.genres && movie.genres.map(item => item.name + ', ')}</p>
          {/* <p>DIRECTOR {director.map(s =>{s.name})}</p> */}
          {<p>cast:{cast.map((castMemeber, index) => {if (index <10){
              return   (
                <div>
                    <div>
                    <p>{castMemeber.name} as {castMemeber.character}</p>
                    <img width="50" src ={`https://image.tmdb.org/t/p/original${castMemeber.profile_path}`}/>
                    </div>
                     
                </div>
            )
          } else{
              return
          }}
          
            )}</p> }
<span className="imdbRatingPlugin" 
        data-user="ur26177280" 
        data-title={imdb} 
        data-style="p1">
            <a target="blank" href={`https://www.imdb.com/title/${imdb}/?ref_=plg_rt_1`}>
                <img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png" 
                alt={movie.title} />
</a></span>{
    function(d,s,id){
        var js,stags=d.getElementsByTagName(s)[0];
        if(d.getElementById(id)){
            return;
        }
        js=d.createElement(s);
        js.id=id;
        js.src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";
        stags.parentNode.insertBefore(js,stags);
        }(document,"script","imdb-rating-api")
        }
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        <p>You May Alos Like {similar.map((movie, index) => 
        index < 11 ? 
        <div>
            <img  height= "150" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/>
            <p>{movie.original_title} </p>
        </div>
        
        
        :  " "
        
        )} </p>
      

        </div>
    )
}

export default MoviePage


