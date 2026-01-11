import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/pets'

// Sends a request to server to get list of all pets
const getAll = () => {
    return axios.get(baseUrl).then((response) => response.data)
}

// Sends a request to server to delete a pet
const deletePet = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)

    return request.then((response) => response.data)
}

// Sends a request to server to add a new pet
const createPet = (newPet) => {
    const request = axios.post(baseUrl, newPet) // request that has URL to send to and new pet object for the body of the request
    return request.then((response) => response.data)    // if promise is successful, get json data of new pet made
}

export default { getAll, deletePet, createPet }