const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

let applicants = [
    {
        id: "1",
        name: "Jonathan Rivers",
        age: "28",
        position: "software dev"
    },
    {
        id: "2",
        name: "Billy Joel",
        age: "30",
        position: "project manager"
    },
    {
        id: "3",
        name: "Samantha James",
        age: "23",
        position: "team lead"
    }
]

app.get('/api/applicants', (request, response) => {
    response.json(applicants)
})

app.get('/api/applicants/:id', (request, response) => {
    const id = request.params.id
    const applicant = applicants.find((person) => person.id === id)

    if(!applicant){
        response.status(404).end()
    } else {
        response.json(applicant)
    }
})

app.delete('/api/applicants/:id', (request, response) => {
    const id = request.params.id
    const del_applicant = applicants.find((person) => person.id === id)

    if(del_applicant){
        applicants = applicants.filter((person) => person.id != id)
        response.status(204).end()
    } else {
        response.status(404).json({
            error: "Applicant trying to delete doesn't exist"
        })
    }
})

const PORT = 3001
app.listen(PORT, (err) => {
    if(err){
        console.log("Error occurred during server start")
    } else{
        console.log(`Server running and listening on port ${PORT}`)
    }
})