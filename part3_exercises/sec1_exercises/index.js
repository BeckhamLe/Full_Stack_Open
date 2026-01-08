const express = require('express');  //import express
const app = express();   // run express function to create express app

app.use(express.json())   // activate json-parser for adding a person section

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-532523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    },
]

//HANDLE GET REQUESTS FOR LIST OF ALL PERSONS
app.get('/api/persons', (request, response) => {
    response.json(persons)
});

//HANDLE GET REQUESTS FOR SINGLE PERSON
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id    // store id of specific person from request to variable
    const person = persons.find((person) => person.id === id)   // find specific person in array and store it in variable

    // Conditional for get request for single person
    if(person){
        response.json(person)   // if person is found respond back with person in json format
    } else{
        response.status(404).end()  // change response status to 404 not found and end response process
    }
})

//HANDLE GET REQUEST FOR THE SERVER INFO PAGE
app.get('/info', (request, response) => {
    const numPeople = persons.length    // set number of people in persons array to variable
    const time = new Date() // create new timestamp and set it to variable
    
    // respond back with current num people in phonebook at current timestamp wrapped around template quotations
    response.send(`
        <p>Phonebook has info for ${numPeople} people</p>
        <p>${time}</p>
    `)
})

//HANDLE DELETE REQUESTS FOR A PERSON
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id    // store the id of the person needing to be deleted in variable
    const person = persons.find((person) => person.id === id)   // find person with same id in persons array and store in variable

    // Check if person needed to be removed exists
    if(person){
        persons = persons.filter((person) => person.id != id)   // filter to only people that don't have id of person needing to be removed for new array
        response.status(204).end()  // return response with no data (204 status) if person was found and successfully deleted
    } else{
        response.status(404).end()  // if person wasn't found return 404 status code
    }
})

// _________________________________________________________________________________________________________________________

// Generate unique id for new person
const generateId = () => {
    let unique = false  // flag to indicate if id is unique or not
    let id = 0  // unique id for new person

    // While id is not unique
    while(!unique) {
        id = Math.floor(Math.random() * 100)    // create a new random integer for id

        // if generated id already exists in persons array
        if(persons.find((person) => person.id === id)) {
            console.log("person exists")
            continue    // skip to next iteration to generate new id
        } else {
            unique = true   // otherwise change flag to true to stop while loop
        }
    }

    return String(id)   // return back unique id as a string
}

// HANDLE REQUESTS FOR ADDING A PERSON
app.post('/api/persons', (request,response) => {
    const body = request.body   // set body of request to variable for easy access

    // Check if new person already exists or if name or number value are missing
    if(persons.find((person) => person.name === body.name) || (!body.name || !body.number)){
        return response.status(400).json({
            error: "name or number is missing or person already exists in phonebook"    // if so return status 400 and let client know about error
        })
    }

    // create JS object for new person
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)    // create copy of persons array, add new person at the end, and set persons array to new copy

    response.json(person)   // send back to client new person object in json format
})


const PORT = 3001
app.listen(3001)
console.log(`Server running on port ${PORT}`)