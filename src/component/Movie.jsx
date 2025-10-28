import React from 'react'
import "./Movie.css"

function Movie(props) {
    const deleteMovieHandler = async ()=>{
        const deleteId = props.id;
        console.log(deleteId);
        await fetch(`https://react-movie-42011-default-rtdb.firebaseio.com/movies/${deleteId}.json`,
        {
            method:"DELETE"
        })
        props.fetchMovie();
    }
    return (
        <li className='movie'>
            <h2>{props.title}</h2>
            <h3>{props.releaseDate}</h3>
            <p>{props.openingText}</p>
            <button onClick={deleteMovieHandler}>Delete Movie</button>

        </li>
    )
}

export default Movie
