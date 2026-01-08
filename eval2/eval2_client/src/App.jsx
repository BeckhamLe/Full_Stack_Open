import { useState } from 'react'
import axios from 'axios'

const baseUrl = "http://localhost:3001/info"

function App() {
  const [city, changeCity] = useState(0)

  function newCity () {
    axios.get(baseUrl).then((response) => {
      changeCity(response.data.name) // update city state to be new city received from server 
    })  // get random city sent from server
  }

  console.log(city) //test

  return (
    <>
      <div>
        <button value={city} onClick={newCity}>Change City</button>
        <p>You can go to {city}</p>
      </div>
    </>
  )
}

export default App
