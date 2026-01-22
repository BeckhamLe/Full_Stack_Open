import axios from 'axios'
const baseUrl = 'http://localhost:3001/aritzia/workers'

// REQUEST TO GET ALL WORKERS
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

// REQUEST TO GET A WORKER
const getOne = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then((response) => response.data)    // returns worker if found or if error rethrow error for App.jsx
}

// REQUEST TO ADD A NEW WORKER TO SERVER
const add = (newWorker) => {
    const request = axios.post(baseUrl, newWorker)
    return request.then((response) => response.data)
}

export default { getAll, getOne, add }