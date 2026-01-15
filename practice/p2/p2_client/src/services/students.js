import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/students'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = (newStudent) => {
    const request = axios.post(baseUrl, newStudent)
    return request.then((response) => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.status)
}

export default { getAll, create, remove }