const express = require('express');  //import express
const app = express();   // run express function to create express app

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

    // Conditional for single person request
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

const PORT = 3001
app.listen(3001)
console.log(`Server running on port ${PORT}`)