const express = require('express')  // import express
const app = express()   // run express to create express app

const cors = require('cors')    // import cors
app.use(cors()) // make server use cors middleware so websites can make requests to it

app.use(express.json()) // activate json parser

let students = [
    {
        id: "1",
        name: "Mary Lou",
        age: "24"
    },
    {
        id: "2",
        name: "Liem Nguyen",
        age: "22"
    },
    {
        id: "3",
        name: "Jerry Frank",
        age: "30"
    }
]

// REQUESTS FOR GETTING LIST OF STUDENTS
app.get('/api/students', (request, response) => {
    response.json(students)
})

// REQUESTS FOR GETTING SPECIFIC STUDENT
app.get('/api/students/:id', (request, response) => {
    const id = request.params.id
    const student = students.find((student) => student.id === id)

    // Checks if student exists
    if(student) {
        response.json(student)  // return student in json format if exists
    } else {
        response.status(404).end()  // if not found tell client that student doesn't exist
    }
})

//REQUEST FOR DELETING A STUDENT
app.delete('/api/students/:id', (request, response) => {
    const id = request.params.id
    const student = students.find((student) => student.id === id)

    // Checks if student exists
    if (student) {
        students = students.filter((student) => student.id != id)   // create copy of old array minus the deleted student and set that as new students array
        response.status(204).end()  // return status 204 to indicate delete successful and end response process
    } else {
        response.status(404).end()  // if student doesn't exist, return 404 and end response process
    }
})

// -------------------------------------------------------Adding Student------------------------------------------------------------------
// Generate a random id for new student
const generateId = () => {
    let newId = 0
    let unique = false

    while (!unique) {
        newId = Math.floor(Math.random() * 101)
        if(!students.find((student) => student.id === newId)) {
            unique = true
        }
    }

    return String(newId)
}

// REQUEST FOR ADDING A STUDENT
app.post('/api/students', (request, response) => {
    const body = request.body   // create ref to request body
    
    // Check if any input fields missing or if student already exists in list
    if(!body.name || !body.age) {
        return response.status(400).json({
            error: "content missing"
        })
    } else if(students.find((student) => student.name === body.name)) {
        return response.status(400).json({
            error: "student already exists"
        }) 
    }

    // create js object for new student
    const newStudent = {
        id: generateId(),
        name: body.name,
        age: body.age,
    }

    students = students.concat(newStudent)  // add new student to students array
    response.json(newStudent)
})

// -----------------------------------------------------------------------------------------------------------------------------------

// Server Setup
const PORT = 3001   // set port 
app.listen(PORT, (err) => { // activate server to listen for requests
    if(err) {
        console.log('Error occurred in server setup')
    } else {
        console.log(`Server is running on port ${PORT}`)
    }
})