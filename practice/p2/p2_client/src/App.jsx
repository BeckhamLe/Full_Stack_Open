import { useState, useEffect } from 'react'
import studentServices from './services/students.js'
import Student from './components/Student.jsx'

const App = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    studentServices.getAll().then((initialStudents) => {
      setStudents(initialStudents)
    })
    console.log("Imported initial students")
  }, [])

  return (
    <>
      <div>
        <ul>
          {students.map((student) => (
            <Student key={student.id} name={student.name} age={student.age} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
