import React, { useState ,useEffect,useCallback} from 'react'
import './App.css'
import MovieList from './component/MovieList'
import AddMovie from './component/AddMovie';

function App() {
  
  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);
  const [retry,setRetry] = useState(false);
 

  const fetchMoviesHandler =useCallback(async ()=>{
    setError(null);
    setIsLoading(true);
    try{
      const response = await fetch("https://react-movie-42011-default-rtdb.firebaseio.com/movies.json");
      if(!response.ok){
        
        throw new Error("Something went wrong...Retrying");
      }
      const data = await response.json();
      const loadedData = [];
      for(const key in data){
        loadedData.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate
        })
      }
      console.log(loadedData);
      setMovies(loadedData);
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

  const addDataHandler=async (data)=>{
    const response = await fetch("https://react-movie-42011-default-rtdb.firebaseio.com/movies.json",
    {
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
    })
    fetchMoviesHandler();
  } 

  let content = <p>No Movies Found</p>

  if(movies.length>0){
    content = <MovieList movies={movies} fetchMovie={fetchMoviesHandler}/>
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
       <AddMovie addDataHandler={addDataHandler}/> 
        
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
