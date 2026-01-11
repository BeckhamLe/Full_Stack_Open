import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/notes';

const getAll = () => {
  const request = axios.get(baseUrl);

  // dummy note to test the catch method for failed promises in App.jsx
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  };
  return request.then((response) => response.data.concat(nonExisting));

  /*
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
  */
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

//module returns an object that has the following functions as its properties
//functions directly return the promises returned by the axios methods
export default { getAll, create, update };
