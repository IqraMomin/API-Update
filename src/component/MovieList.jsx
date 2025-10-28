import React from 'react'
import Movie from './Movie'
import "./MovieList.css"

function MovieList(props) {
    return (
        <ul className='movies-list'>
            {props.movies.map(movie=>{
                return <Movie
                key={movie.id}
                id={movie.id}
                fetchMovie={props.fetchMovie}
                title={movie.title}
                openingText={movie.openingText}
                releaseDate={movie.releaseDate}/>
            })}
        </ul>
        
    )
}

export default MovieList
