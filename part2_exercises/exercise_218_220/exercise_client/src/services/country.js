import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

// REQUEST FOR LIST OF ALL COUNTRIES
const getAll = () => {
    const request = axios.get(`${baseUrl}api/all`)
    return request.then((response) => response.data)    // returns list of all countries in json format
}

export default { getAll }