import { useState, useEffect } from 'react'
import workersServices from './services/workers.js'
import Worker from './components/Worker.jsx'
import Notification from './components/Notification.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [workers, setWorkers] = useState([])
  const [oneWorker, setOneWorker] = useState({name: "Worker Name", age:"worker age", position: "Worker Position"})
  const [findWorkerId, setFindWorkerId] = useState("...enter worker id")
  const [errorMessage, setErrorMessage] = useState(null)

  // Load in initial set of workers from server
  useEffect(() => {
    // Send request to get all workers and update state with this list given from server
    workersServices.getAll().then((initialWorkers) => {
      setWorkers(initialWorkers)
    })
    console.log("Imported Initial Workers")
  }, [])

  // Search for specific worker functionality
  const findWorker = (event) => {
    event.preventDefault()  // prevent default submit functionality
    setErrorMessage(null) // clear out any previous error messages

    // Check if worker exists
    workersServices.getOne(findWorkerId)
      .then(
        (returnedWorker) => setOneWorker(returnedWorker)  // if get request successful, set worker to state to be displayed
      )
      .catch(
        (err) => {
          setErrorMessage(err.response?.data?.error)  // if error was returned instead, set error message to state to be displayed
          setTimeout(() => {  // set a timer for how long error msg is displayed
            setErrorMessage(null) // set error msg to null so on rerender it disappears
          }, 5000)  // time limit of 5 sec
        }
      )
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
        <Notification message={errorMessage} />
        <p>{oneWorker.name}</p>
        <p>{oneWorker.age}</p>
        <p>{oneWorker.position}</p>
      </div>
      <Footer />
    </>
  )
}

export default App
