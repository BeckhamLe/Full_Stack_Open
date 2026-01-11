const express = require('express'); // import express which is a function
const app = express(); // create an express app and store it in variable app

app.use(express.json()) // activates json-parser to access data easily

const cors = require('cors')
app.use(cors())

let notes = [
  {
    id: '1',
    content: 'HTML is easy',
    important: true,
  },
  {
    id: '2',
    content: 'Browser can execute only JS',
    important: false,
  },
  {
    id: '3',
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

// HANDLES ALL HTTP REQUESTS FOR GETTING MAIN URL FOR SERVER
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

// HANDLES ALL HTTP REQUESTS FOR GETTING ALL NOTES
app.get('/api/notes', (request, response) => {
  response.json(notes);
});

// HANDLES ALL HTTP REQUESTS FOR GETTING SPECIFIC NOTES
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id; // variable to access the id parameter in the route of a request
  const note = notes.find((note) => note.id === id);

  // Check if the note found exists
  if (note) {
    response.json(note); // if so return the note in json format
  } else {
    response.status(404).end(); // if not return 404 status and end the response process
  }
});

// HANDLES ALL HTTP REQUESTS FOR DELETING A NOTE
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id != id); // filter and only keep notes that aren't the note wanting to be removed

  response.status(204).end(); // return no data with response if note is found and deleted successfully
});

// _________________________________________________________________

//Function to generate unique Id for new note
const generateId = () => {
  // find out largest id number in current list and assign it to maxId var
  const maxId = notes.length > 0  // conditional to check if list is empty or not
  ? Math.max(...notes.map(n => Number(n.id))) // if not empty use max method to find largest id number in list
  : 0 // if current list is empty set id number to 0

  return String(maxId + 1)  // return new id to be maxId+1
}

// HANDLES ALL REQUESTS FOR ADDING A NOTE TO SERVER
app.post('/api/notes', (request, response) => {
  const body = request.body 
  
  // if received data is missing value in content property -> server sends back 400 status code of a bad request made
  if(!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false, // if important property is missing in request then default to setting it to false
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
