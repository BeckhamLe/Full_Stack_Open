import { useState } from 'react'  // import state library
import Pet from '/src/components/Pet.jsx'
import petServices from '/src/services/pets.js' // import services that send requests to server

function App() {
  const [pets, updatePets] = useState([]) // initialize pets state to empty array

  function getAllPets () {
    const petList = petServices.getAll().then((initialPets) => {
      updatePets(initialPets)
    })

    return console.log("Successfully retrieved list of all pets")
  }

  return (
    <>
      <div>
        <button onClick={getAllPets}>Get all pets</button>
        <ul>
          {pets.map((pet) => (
            <Pet 
              key={pet.id}
              name={pet.name} 
              type={pet.type} 
            />
            ))}
        </ul>
      </div>
    </>
  )
}

export default App
