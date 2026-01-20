import { useState, useEffect } from 'react'
import workersServices from './services/workers.js'
import Worker from './components/Worker.jsx'

function App() {
  const [workers, setWorkers] = useState([])
  const [findWorker, setFindWorker] = useState({})

  useEffect(() => {
    workersServices.getAll().then((initialWorkers) => {
      setWorkers(initialWorkers)
    })
    console.log("Imported Initial Workers")
  }, [])

  return (
    <>
      <div id="workers">
        {workers.map((worker) => (
          <div>
            <h3>{worker.id}</h3>
            <Worker name={worker.name} age={worker.age} position={worker.position}/>  
          </div>
        ))}
      </div>
    </>
  )
}

export default App
