import { useState, useEffect } from 'react';
import Note from './components/Note'; // importing component file that generates a note object for display
import noteService from './services/notes'; // importing note functions

const App = () => {
  const [notes, setNotes] = useState([]); //initialize piece of state (notes) with the initial notes array passed in the props
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      // getAll() will return the response data of all the initial notes and hand it off to the then method
      setNotes(initialNotes); // then method will call setNotes method to make the initial notes the current notes array
    });
  }, []);

  console.log('render', notes.length, 'notes'); // test msg

  // event handler to create and add a new note
  const addNote = (event) => {
    event.preventDefault(); //prevents the default action of submission and reloading the page

    // where the new note is created with the info from user input
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    // send post request to server to save new note to the database when save button is clicked
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote(''); // reset the input field
    });
  };

  // event handler to toggle/change the importance of a note
  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`; // defines the unique URL for each note resource based on its id
    const note = notes.find((n) => n.id === id); // use array find method to find note to modify
    const changedNote = { ...note, important: !note.important }; // create a new object that is an exact copy of the old note but with the important property flipped from what it currently is
    // (...note = object spread syntax to create new object)
    // must do this method for making changes to a note as we never mutate state directly

    // using the update method of the noteService to update the importance of a note
    // this case it takes the id of the note needed to be modified and a copy of that note with the changes
    // the update method will return
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note))); // upon success, set component's notes state to a new array that has all old notes except for the one replaced by the new note
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id)); // filter out the deleted note from the state
      });
  };

  // event handler to update the contents/state of the new note
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  // variable to hold a list of all notes to be displayed
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />{' '}
        {/*controlled component */}
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
