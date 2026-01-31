import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/applicants'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const getOne = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

const deleteOne = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

export default { getAll, getOne, deleteOne }