import React, { useRef } from 'react'

function AddMovie(props) {
    const titleRef = useRef();
    const openingRef = useRef();
    const dateRef = useRef();


    const formSubmitHandler = (e)=>{
        e.preventDefault();
        const data ={
          title:titleRef.current.value,
          openingText:openingRef.current.value,
          releaseDate:dateRef.current.value
        }
        props.addDataHandler(data);
      }

    return (
        <form onSubmit={formSubmitHandler}>
        <label htmlFor='title'>Title</label>
        <input id='title' ref={titleRef} />
        <label htmlFor='openingText'>Opening Text</label>
        <input id='openingText' ref={openingRef}/>
        <label htmlFor='date'>Release Date</label>
        <input id='date' ref={dateRef}/>
        <button type='submit'>Add Movie</button>
        </form>
    )
}

export default AddMovie
