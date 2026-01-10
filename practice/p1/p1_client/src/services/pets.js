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

export default { getAll, deletePet }