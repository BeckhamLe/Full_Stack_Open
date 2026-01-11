const express = require('express')  //import express
const app = express()   // create express app

const cors = require('cors')    //import cors
app.use(cors())

let animals = ["tiger", "lion", "elephant", "giraffe"]

//  HANDLES REQUESTS TO GET A RANDOM ANIMAL
app.get('/info', (request, response) => {
    const randomIndex = Math.floor(Math.random() * animals.length)  // generate random index in range of array length
    
    response.json(animals[randomIndex]) // return back random animal in json format
})

const PORT = 3001
app.listen(PORT, (err) => {
    if(err){
        console.log("Error in server setup")
    } else{
        console.log(`Running server on port ${PORT}`)
    }
})