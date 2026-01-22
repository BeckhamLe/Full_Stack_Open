import { useState, useEffect } from 'react'
import workersServices from './services/workers.js'
import Worker from './components/Worker.jsx'
import Notification from './components/Notification.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [workers, setWorkers] = useState([])
  const [oneWorker, setOneWorker] = useState({name: "Worker Name", age:"worker age", position: "Worker Position"})
  const [findWorkerId, setFindWorkerId] = useState("...enter worker id")
  const [errorFlag, setErrorFlag] = useState(false)
  const [message, setMessage] = useState(null)
  const [newWorkerName, setNewWorkerName] = useState("...enter new worker name")
  const [newWorkerAge, setNewWorkerAge] = useState("...enter new worker age")
  const [newWorkerPosition, setNewWorkerPosition] = useState("...enter new worker position")

  // Load in initial set of workers from server
  useEffect(() => {
    // Send request to get all workers and update state with this list given from server
    workersServices.getAll().then((initialWorkers) => {
      setWorkers(initialWorkers)
    })
    console.log("Imported Initial Workers")
  }, [])
  // -----------------------------------------------------------------------------------------

  // Search for specific worker functionality
  const findWorker = (event) => {
    event.preventDefault()  // prevent default submit functionality
    setMessage(null) // clear out any previous error messages

    // Check if worker exists
    workersServices.getOne(findWorkerId)
      .then(
        (returnedWorker) => setOneWorker(returnedWorker)  // if get request successful, set worker to state to be displayed
      )
      .catch(
        (err) => {
          setErrorFlag(true)  // turn error flag on to indicate that error msg needs to be displayed
          setOneWorker({name: "", age: "", position: ""}) // clear info on previous worker searched and set it to blank since person currently searched doesn't exist
          setMessage(err.response?.data?.error)  // if error was returned instead, set error message to state to be displayed
          setTimeout(() => {  // set a timer for how long error msg is displayed
            setMessage(null) // set error msg to null so on rerender it disappears
          }, 5000)  // time limit of 5 sec
        }
      )
  }

  // Updates the id value of worker on change
  const findWorkerIdChange = (event) => {
    console.log(event.target.value)
    setFindWorkerId(event.target.value)
  }
  // -----------------------------------------------------------------------------------------

  // Add a new worker functionality
  const addWorker = (name, age, position) => {
    event.preventDefault()
    setMessage(null) // clear out any previous error messages

    const worker = {
      name: name,
      age: age,
      position: position
    }

    workersServices.add(worker)
      .then(
        (returnedWorker) => {
          // Update state of list of workers to include new worker
          setWorkers(workers.concat(returnedWorker))
          // Clear new worker name, age, and position input fields
          setNewWorkerName("")
          setNewWorkerAge("")
          setNewWorkerPosition("")

          // Turn flag off since no error
          setErrorFlag(false)
          setMessage(`Added ${returnedWorker.name}`)  // set success message
          setTimeout(() => {
            setMessage(null)  // clear message state after 5 seconds
          }, 5000)
        }
      )
      .catch(
        (err) => {
          setErrorFlag(true)
          setMessage(err.response?.data?.error)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
      )

  }

  // Updates the name of new worker on change
  const newWorkerNameChange = (event) => {
    console.log(event.target.value)
    setNewWorkerName(event.target.value)
  }

  // Updates the age of new worker on change
  const newWorkerAgeChange = (event) => {
    console.log(event.target.value)
    setNewWorkerAge(event.target.value)
  }

  // Updates the position of new worker on change
  const newWorkerPositionChange = (event) => {
    console.log(event.target.value)
    setNewWorkerPosition(event.target.value)
  }

  // -----------------------------------------------------------------------------------------

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
        {console.log(`message: ${message}`)}
        <Notification message={message} flag={errorFlag} />
        <p>{oneWorker.name}</p>
        <p>{oneWorker.age}</p>
        <p>{oneWorker.position}</p>
      </div>
      <br/>
      <h1>Add New Worker</h1>
      <form onSubmit={addWorker}>
        <input value={newWorkerName} onChange={newWorkerNameChange} />
        <br/>
        <br/>
        <input value={newWorkerAge} onChange={newWorkerAgeChange} />
        <br/>
        <br/>
        <input value={newWorkerPosition} onChange={newWorkerPositionChange} />
        <br/>
        <br/>
        <button type='submit'>Add</button>
        <br />
        <Notification message={message} flag={errorFlag} />
      </form>

      <Footer />
    </>
  )
}

export default App
