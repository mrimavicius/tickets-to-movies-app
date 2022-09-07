import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import mainContext from '../context/mainContext';
import SingleSeat from './SingleSeat';

const MovieModal = () => {

    const { socket, setShowModal, onlineUser, singleMovie: movie, setError, setSuccess } = useContext(mainContext)
    const [seats, setSeats] = useState([])

    useEffect(() => {
        socket.on("send-seats", data => setSeats(data))
        socket.on("error", error => setError(error))
        socket.on("success", success => setSuccess(success))
    },[])

    const [seatsSelected, setSeatsSelected] = useState([])
    const TICKET_PRICE = 7.99
    const total = seatsSelected.length * TICKET_PRICE

    function buy(){
      if(seatsSelected.length === 0 ) return
      socket.emit("buy-tickets", {seatsSelected, total, movie: movie.title, user: onlineUser})
      setShowModal(false)
    }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close d-flex space-btw just-center align center">
          <h3>{movie.title}</h3>
          <span onClick={() => setShowModal(false)}>&times;</span>
        </div>
        <div className="d-flex just-center align-center">
          <div className="seat-grid">
            {seats.map((x, i) => <SingleSeat key={i} item={x} index={i} seatsSelected={seatsSelected} setSeatsSelected={setSeatsSelected} />)}
          </div>
          <div className="buy-panel">
            <p>One Ticket Price: 7.99$</p>
            <p>Tickets: {seatsSelected.length}</p>
            <p>Total: {total.toFixed(2)}$</p>
            <button onClick={buy}>Buy Tickets</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal