import { useState, useEffect } from 'react'
import workersServices from './services/workers.js'
import Worker from './components/Worker.jsx'

function App() {
  const [workers, setWorkers] = useState([])
  const [oneWorker, setOneWorker] = useState({name: "Worker Name", age:"worker age", position: "Worker Position"})
  const [findWorkerId, setFindWorkerId] = useState("...enter worker id")

  // Load in initial set of workers from server
  useEffect(() => {
    // Send request to get all workers and update state with this list given from server
    workersServices.getAll().then((initialWorkers) => {
      setWorkers(initialWorkers)
    })
    console.log("Imported Initial Workers")
  }, [])

  const findWorker = (event) => {
    event.preventDefault()

    workersServices.getOne(findWorkerId).then((returnedWorker) => {
      setOneWorker(returnedWorker)
    })
  }

  // Updates the id value of worker to find
  const findWorkerIdChange = (event) => {
    console.log(event.target.value)
    setFindWorkerId(event.target.value)
  }

  return (
    <>
      <div>
        {workers.map((worker) => (
          <div key={worker.id}>
            <h3>{worker.id}</h3>
            <Worker name={worker.name} age={worker.age} position={worker.position}/>  
          </div>
        ))}
      </div>
      <h1>Search for specific worker</h1>
      <form onSubmit={findWorker}>
        <input value={findWorkerId} onChange={findWorkerIdChange} />
        <button type='submit'>Find</button>
      </form>
      <br/>
      <div>
        <p>{oneWorker.name}</p>
        <p>{oneWorker.age}</p>
        <p>{oneWorker.position}</p>
      </div>
    </>
  )
}

export default App
