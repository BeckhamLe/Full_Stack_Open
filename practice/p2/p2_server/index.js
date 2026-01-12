const express = require('express')  // import express
const app = express()   // run express to create express app

const cors = require('cors')    // import cors
app.use(cors()) // make server use cors middleware so websites can make requests to it

const students = [
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

// Server Setup
const PORT = 3001   // set port 
app.listen(PORT, (err) => { // activate server to listen for requests
    if(err) {
        console.log('Error occurred in server setup')
    } else {
        console.log(`Server is running on port ${PORT}`)
    }
})