import React, { useState } from 'react'

const SingleSeat = ({ item, index, seatsSelected, setSeatsSelected }) => {

    const [selected, setSelected] = useState(false)

    
    function select() {
        if(item.available === false) return
        
        let seatsSelectedCopy = seatsSelected

        if (seatsSelected.find((x) => x === index)) {
            seatsSelectedCopy = seatsSelected.filter((x) => x !== index);
          setSeatsSelected(seatsSelectedCopy);
        } else {
          setSeatsSelected([...seatsSelectedCopy, index]);
        }

        setSelected(!selected)
    }

    function getClass(){
        let result = item.available === true ? "fa-solid fa-couch" : "fa-solid fa-couch taken"

        if(selected === true) result = "fa-solid fa-couch selected"

        return result
    }

  return (
    <div>
      <i onClick={select} className={getClass()}></i>
    </div>
  );
}

export default SingleSeat