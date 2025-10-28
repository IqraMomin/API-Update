import React, { useState ,useEffect,useCallback} from 'react'
import './App.css'
import MovieList from './component/MovieList'

function App() {
  
  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);
  const [retry,setRetry] = useState(false);


  const fetchMoviesHandler =useCallback(async ()=>{
    setError(null);
    setIsLoading(true);
    try{
      const response = await fetch("https://swapi.dev/api/films/");
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
      setRetry(false);
      
     }catch(err){
      setError(err.message);
      setRetry(true);

    }
    setIsLoading(false);
  },[])

  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  useEffect(()=>{
    if(retry){
      const timer = setTimeout(()=>{
        fetchMoviesHandler();
      },5000);
      return ()=>{
        clearTimeout(timer);
      }
    }
    
  },[fetchMoviesHandler,retry]);

  let content = <p>No Movies Found</p>

  if(movies.length>0){
    content = <MovieList movies={movies}/>
  }

  if(retry){
    content = <div>
    <p>{error}</p>
    <button onClick={() => {
      setRetry(false);
      }}>Cancel</button>
  </div>
  }

  if(isLoading){
    content =  <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section className='btn-section'>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  )
}

export default App
