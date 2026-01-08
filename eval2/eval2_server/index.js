const express = require('express')  //import express
const app = express()   // create express app

const cors = require('cors')    // import cors
app.use(cors()) // activate cors

let cities = ["Denver", "New York", "Phoenix", "Goodyear"]

app.get('/info', (request, response) => {
    const randomIndex = Math.floor(Math.random() * cities.length) // generate a random int for a random index in cities array

    const randomCity = {
        name: cities[randomIndex]
    }

    response.json(randomCity)
})

const PORT = 3001
app.listen(PORT, (err) => {
    if (err) {
        console.log("Error in server setup")
    } else{
        console.log(`Server is running on port ${PORT}`)
    }
})