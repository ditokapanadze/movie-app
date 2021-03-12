import React, {useState, useEffect} from 'react'
import axios from './axios'
import "./row.css"
import Youtube from "react-youtube"
import movieTrailer from "movie-trailer"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore,{Navigation, Pagination} from 'swiper';
import requests from './requests'
import 'swiper/swiper-bundle.css'


SwiperCore.use([Navigation, Pagination ])



const base_url= "https://image.tmdb.org/t/p/original"
function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
     
    useEffect(()=>{ 
        async function fetchData(){
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }
        fetchData()
       
    }, [fetchUrl])



      // Options for react-youtube
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };
      
//  const  slides =()=>{
//    return []
//  }

const sacdeli = [

]
     const slides = []
      
        
 
        //  movies.map(movie =>(
        //    <SwiperSlide>
        //     <img 
        //     onClick={()=>handleClick(movie)}
        //     key={movie.id}
        //     className={`row_poster ${isLargeRow && "row_posterLarge"}`}
        //     src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
        //     alt={movie.name} />
        //     </SwiperSlide>
        // )) 
    
  
     

    //  for( let i = 0; i <5; i +=1){
    //    sacdeli.push(
    //      <SwiperSlide key={i}>
    //     <img  src="https://static.hollywoodreporter.com/sites/default/files/2012/12/img_logo_blue.jpg"/>
    //      </SwiperSlide>
    //    )
    //  }
        
    movies.map((movie) =>(
       sacdeli.push
            (<SwiperSlide key={movie.id}>
              <h2>{title}</h2>
              <div className="row_posters"> 
             <img 
              onClick={()=>handleClick(movie)}
               key={movie.id}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
              alt={movie.name} />
             </div>
              </SwiperSlide>)
         )) 
     

    for (let i = 0; i <= sacdeli.length; i +=1){
      slides.push(sacdeli[i])
    }
     console.log(movies)
     console.log("es")

     
      console.log(requests.search + "woman")
   
     
    return (
      
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
              { movies.map(movie =>(
                  <img 
                  onClick={()=>handleClick(movie)}
                  key={movie.id}
                  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                  src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                  alt={movie.name} />
              )) }
            </div>
          {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>

      // <React.Fragment>
      //   <Swiper  navigation pagination  >
          
      //     {slides}
      //   </Swiper>
      // </React.Fragment>
        
         
    )
}

export default Row
