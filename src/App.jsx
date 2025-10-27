import React, { useState } from 'react'
import './App.css'
import MovieList from './component/MovieList'

function App() {
  
  const [movies,setMovies] = useState([]);
  const fetchMoviesHandler = async ()=>{
    try{
      const response = await fetch("https://swapi.dev/api/films/");
      const data = await response.json();
      const transformedData = data.results.map(movie=>{
        return {
          id:movie.episode_id,
          title:movie.title,
          openingText:movie.opening_crawl,
          releaseDate:movie.release_date
        }
      })
      setMovies(transformedData);
      
     }catch(err){

    }
  }
  return (
    <React.Fragment>
      <section className='btn-section'>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MovieList movies={movies}/>
      </section>
    </React.Fragment>
  )
}

export default App
