import React, { useContext, useEffect } from 'react'
import MovieModal from '../components/MovieModal'
import mainContext from '../context/mainContext'

const MoviesPage = () => {

  const { socket, movies, showModal, setShowModal, setSingleMovie, setMovies, setError, setSuccess } = useContext(mainContext) 

  useEffect(() => {
    socket.on("update-movies", (movies) => setMovies(movies));
    setError("")
    setSuccess("")
  }, [])

  function select(movie) {
    setError("")
    setSuccess("")
    socket.emit("request-seats", movie.title)
    setSingleMovie(movie)
    setShowModal(true)
  }

  return (
    <div className='d-flex flex-wrap'>

      {showModal && <MovieModal/>}

      {movies.map((x, i) => (
        <div onClick={() => select(x)} className='movie' key={i}>
          <img src={x.img} alt="" />
          <div className='movie-info'>
            <div className='d-flex space-btw'>
              <h3>{x.title}</h3>
              <h4>N-{x.pg}</h4>

            </div>
            <p>Seats: {x.seatsLeft} / 30</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MoviesPage