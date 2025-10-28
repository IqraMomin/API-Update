import React, { useState } from 'react'
import './App.css'
import MovieList from './component/MovieList'

function App() {
  
  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);
  const fetchMoviesHandler = async ()=>{
    setError(null);
    setIsLoading(true);
    try{
      const response = await fetch("https://swapi.dev/api/film/");
      if(!response.ok){
        throw new Error("Something went wrong...Retrying");
      }
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
      setError(null);
      
     }catch(err){
      setError(err.message);

    }
    setIsLoading(false);
  }
  return (
    <React.Fragment>
      <section className='btn-section'>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {!isLoading && movies.length>0 && <MovieList movies={movies}/>}
       {isLoading && <p>Loading...</p>}
       {!isLoading && movies.length===0 && !error && <p>No movies Found</p>}
       {error && <p>{error}</p>}
      </section>
    </React.Fragment>
  )
}

export default App
