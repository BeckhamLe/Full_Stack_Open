import { useState, useEffect } from 'react'
import studentServices from './services/students.js'
import Student from './components/Student.jsx'

const App = () => {
  const [students, setStudents] = useState([])

  const [newName, setNewName] = useState('...new student name')
  const [newAge, setNewAge] = useState('...new student age')

  const [deleteName, setDeleteName] = useState('...name of student to delete')

  useEffect(() => {
    studentServices.getAll().then((initialStudents) => {
      setStudents(initialStudents)
    })
    console.log("Imported initial students")
  }, [])

  // ------------------------------------------- ADDING NEW STUDENT FUNCTIONALITY -----------------------------------------------

  // ADDING NEW STUDENT FUNCTION
  const addNewStudent = (event) => {
    event.preventDefault(); //prevents the default action of submission and reloading the page

    const newStudent = {
      name: newName,
      age: newAge
    }
      
    studentServices.create(newStudent).then((returnedStudent) => {
      setStudents(students.concat(returnedStudent))
      setNewName('')
      setNewAge('')
    })
    
  }

  // EVENT HANDLER TO UPDATE THE NEW NAME INPUTTED
  const handleNewNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // EVENT HANDLER TO UPDATE THE NEW AGE INPUTTED
  const handleNewAgeChange = (event) => {
    console.log(event.target.value)
    setNewAge(event.target.value)
  }

// ------------------------------------------------------ DELETING STUDENT FUNCTIONALITY ----------------------------------------------------------------

// DELETING A STUDENT FUNCTION
const deleteStudent = (event) => {
  event.preventDefault()

  const deleteStudent = students.find((student) => student.name === deleteName)
  studentServices.remove(deleteStudent.id).then((status) => {
    if(status === 204) {
      console.log("Student Successfully deleted")
      setStudents(students.filter((student) => student.name != deleteName))
      setDeleteName('')
    }
  })
  .catch((err) => {
    console.log('Failed to delete: ', err.response?.status)
  })

}

// EVENT HANDLER TO UPDATE NAME OF STUDENT BEING DELETED
const handleDeleteNameChange = (event) => {
  console.log(event.target.value)
  setDeleteName(event.target.value)
}

  return (
    <>
      <div>
        <ul>
          {students.map((student) => (
            <Student key={student.id} name={student.name} age={student.age} />
          ))}
        </ul>
      </div>
      <div>
        <form onSubmit={addNewStudent}>
          <input value={newName} onChange={handleNewNameChange} />
          <br/>
          <input value={newAge} onChange={handleNewAgeChange} />
          <br/>
          <button type='submit'>Add Student</button>
        </form>
      </div>
      <br/>
      <div>
        <form onSubmit={deleteStudent}>
          <input value={deleteName} onChange={handleDeleteNameChange} />
          <br/>
          <button type='submit'>Delete</button>
        </form>
      </div>
    </>
  )
}

export default App
