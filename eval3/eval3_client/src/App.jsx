import { useState } from 'react'
import animalService from './services/animal.js'

const App = () => {
  const [animal, setAnimal] = useState('(random animal)')

  const updateAnimal = () => {
    const newAnimal = animalService.getAnimal()

    setAnimal(newAnimal)

    console.log(animal.value)
  }

  return (
    <>
      <button onClick={updateAnimal}>Get Random Animal</button>
      <p>The animal you got was {animal}</p>
    </>
  )
}

export default App
