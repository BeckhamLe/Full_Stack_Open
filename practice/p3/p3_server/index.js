const express = require('express')  // import express
const app = express()   // create express app server

const cors = require('cors')    // import cors
app.use(cors()) // make express use cors

app.use(express.json()) // activate json parser

let workers = [
    {
        id: "1",
        name: "Heiyi Lam",
        age: "24",
        position: "stylist advisor"
    },
    {
        id: "2",
        name: "James Conwell",
        age: "22",
        position: "clerk"
    },
    {
        id: "3",
        name: "Mariah Ruiz",
        age: "20",
        position: "manager"
    }
]

// GET LIST OF ALL WORKERS
app.get('/aritzia/workers', (request, response) => {
    response.json(workers)
})

// GET SPECIFIC WORKER
app.get('/aritzia/workers/:id', (request, response) => {
    const id = request.params.id
    const worker = workers.find((person) => person.id === id)

    if(worker) {
        response.json(worker)   // return worker in json format if search was successful
    } else {
        response.status(404).json({
            error: "Worker Doesn't Exist"   // if not found, return back error with set error message
        })
    }
})

// DELETE A WORKER
app.delete('/aritzia/workers/:id', (request, response) => {
    const id = request.params.id
    const worker = workers.find((person) => person.id === id)

    if(worker) {
        workers = workers.filter((person) => person.id != worker.id)
        response.status(204).end()  // Successfully deleted person with specified id
    } else {
        response.status(404).end()  // person doesn't exist
    }
})

// Generate random unique id for new worker
 const generateId = () => {
    let new_id = 0
    let unique = false

    while(!unique) {
        new_id = Math.floor(Math.random() * 101)

        if(workers.find((person) => person.id != new_id)){
            unique = true
        }
    }

    return new_id
 }

// ADDING A WORKER
app.post('/aritzia/workers', (request, response) => {
    console.log("Trying to add worker")
    const body = request.body

    if(!body.name || !body.age || !body.position) {
        console.log("bad request")
        return response.status(400).json({
            error: "content missing"
        })
    }

    const new_worker = {
        id: generateId(),
        name: body.name,
        age: body.age,
        position: body.position
    }

    workers = workers.concat(new_worker)
    response.json(new_worker)
    console.log("success")
})

const PORT = 3001
app.listen(PORT, (err) => {
    if(err) {
        console.log("Error in server setup")
    } else{
        console.log(`Server listening on port ${PORT}`)
    }
})