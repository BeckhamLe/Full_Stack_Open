import { useState, useEffect } from 'react'  // import state library
import Pet from '/src/components/Pet.jsx'
import petServices from '/src/services/pets.js' // import services that send requests to server

const App = () => {
  const [pets, updatePets] = useState([]) // initialize pets state to empty array
  const [newPetName, changeNewPetName] = useState('...new pet name')
  const [newPetType, changeNewPetType] = useState('...new pet type')

  useEffect(() => {
    petServices.getAll().then((initialPets) => {
      updatePets(initialPets)
    })
  }, [])

  const addNewPet = (event) => {
    event.preventDefault()  //prevents the default action of submitting and reloading the page

    const newPet = {
      name: newPetName,
      type: newPetType
    }

    petServices.createPet(newPet).then((returnedPet) => {
      updatePets(pets.concat(returnedPet))
      changeNewPetName('')
      changeNewPetType('')
    })
  }

  // Event handler to update the name of new pet
  const updatePetName = (event) => {
    console.log(event.target.value)
    changeNewPetName(event.target.value)
  }

  // Event handler to update the type of new pet 
  const updatePetType = (event) => {
    console.log(event.target.value)
    changeNewPetType(event.target.value)
  }

  return (
    <>
      <div>
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
      <h1>Add a Pet</h1>
      <form onSubmit={addNewPet}>
        <input value={newPetName} onChange={updatePetName} /> {" "}
        <input value={newPetType} onChange={updatePetType} /> {" "}
        <button type='submit'>add</button>
      </form>
    </>
  )
}

export default App
