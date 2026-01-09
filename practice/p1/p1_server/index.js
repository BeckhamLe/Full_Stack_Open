const express = require('express')  //import express 
const app = express()   // create express app
const cors = require('cors')    // import cors
app.use(cors())   // tell express server to use CORS middleware so web pages can make requests

app.use(express.json()) // activates json-parser to access data easily

let pets = [
    {
        id: "1",
        name: "Gary",
        type: "dog"
    },
    {
        id: "2",
        name: "Boba",
        type: "cat"
    },
    {
        id: "3",
        name: "Vegeta",
        type: "turtle"
    }
]

// ----------------------------REQUEST HANDLING-------------------------------

// GET ALL PETS
app.get('/api/pets', (request, response) => {
    response.json(pets)
})

// GET SPECIFIC PET
app.get('/api/pets/:id', (request, response) => {
    const id = request.params.id    // access id in request and set to var
    const pet = pets.find((pet) => pet.id === id)   // find specific pet and store in variable

    // Check if specific pet exists
    if(pet){
        response.json(pet)  // send back data of specific pet 
    } else{
        response.status(404).end()   // pet doesn't exist so send back 404
    }
}) 

// DELETE A PET FROM LIST
app.delete('/api/pets/:id', (request, response) => {
    const id = request.params.id 
    const pet = pets.find((pet) => pet.id === id)

    // Check if pet wanting to be deleted exists
    if(pet) {
        pets = pets.filter((pet) => pet.id != id)   // filter out the deleted pet from array of pets
        response.status(204).end()  // send back 204 on successful deletion and end response process
    } else{
        response.status(404).end()  // send back 404 if pet doesn't exist and end response process
    }
})

//-------------------------------------------------------------------------------------------------------

// GENERATE A RANDOM NEW ID FOR NEW PET
const newId = () => {
    let randomId = 0
    let unique = false  // flag to determine if randomId is unique

    while (!unique) {
        randomId = Math.floor(Math.random() * 101)  // generate random integer for random id

        if (pets.find((pet) => pet.id === randomId)){
            continue
        } else{
            unique = true
        }
    }

    return String(randomId)
}

// ADDING A NEW PET

app.post('/api/pets', (request, response) => {
    const body = request.body   // reference to request body
    
    // create js object for new pet 
    const newPet = {
        id: newId(),
        name: body.name,
        type: body.type
    }

    pets = pets.concat(newPet)  // add new pet to pets array
    response.json(newPet)
})

// activating express server to listen on port 3001 for requests
const PORT = 3001
app.listen(PORT, (err) => {
    if(err){
        console.log("Error in server setup")
    } else{
        console.log(`Server running on port ${PORT}`)
    }
})