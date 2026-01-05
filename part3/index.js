const express = require('express'); // import express which is a function
const app = express(); // create an express app and store it in variable app

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

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

// HANDLES ALL HTTP REQUESTS SEEKING ALL NOTES
app.get('/api/notes', (request, response) => {
  response.json(notes);
});

// HANDLES ALL HTTP REQUESTS FOR SPECIFIC NOTES
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
app.delete('api/notes/:id', (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id != id); // filter and only keep notes that aren't the note wanting to be removed

  response.status(204).end(); // return no data with response if note is found and deleted successfully
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
