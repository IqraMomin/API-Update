import React, { useState ,useEffect,useCallback} from 'react'
import './App.css'
import MovieList from './component/MovieList'

function App() {
  
  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);
  const [retry,setRetry] = useState(false);
  const [title,setTitle] = useState("");
  const [openingText,setOpeningText] = useState("");
  const [date,setDate] = useState("");

  const titleChangeHandler=(e)=>{
    setTitle(e.target.value);
  }

  const openingTextChangeHandler=(e)=>{
    setOpeningText(e.target.value);
  }

  const dateChangeHandler=(e)=>{
    setDate(e.target.value);
  }
  
  const formSubmitHandler = (e)=>{
    e.preventDefault();
    const data ={
      id:Date.now().toString(),
      title,
      opening_crawl:openingText,
      release_date:date
    }
    setTitle("");
    setOpeningText("");
    setDate("");
    console.log(data);
  }

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
      <section>
        <form onSubmit={formSubmitHandler}>
        <label htmlFor='title'>Title</label>
        <input id='title' onChange={titleChangeHandler} value={title}/>
        <label htmlFor='openingText'>Opening Text</label>
        <input id='openingText' onChange={openingTextChangeHandler} value={openingText}/>
        <label htmlFor='date'>Release Date</label>
        <input id='date' onChange={dateChangeHandler} value={date}/>
        <button type='submit'>Add Movie</button>
        </form>
        
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  )
}

export default App
