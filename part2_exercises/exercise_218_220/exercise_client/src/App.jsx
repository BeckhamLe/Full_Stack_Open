import { useState, useEffect, useRef } from 'react'
import countryServices from './services/country.js'
import Countries from './components/Countries.jsx'
// import './App.css'

function App() {
  const [countries, setCountries] = useState(null)  //state to hold list of all countries
  const [search ,setSearch] = useState("")  // state to hold input value of user for searching
  const fetchStartedRef = useRef(false)   // flag to make sure fetching all countries request only runs once
  
  // Re-Renders the whole app and runs after that everytime search changes
  useEffect(() => {
    console.log(`effect run, searched country is ${search}`)

    if(search != ""){   // First check if user has typed something
      if(!countries){   // Then check if list of countries is empty
        if(fetchStartedRef.current === false){  // then check if fetching list of countries is in progress
          fetchStartedRef.current = true    // if not then turn on flag to start it
          countryServices.getAll().then((allCountries) => {   // load in countries from api
            setCountries(allCountries)    // update countries state with list
          })
          console.log("Loaded countries")
        }
      }

    } else{
      console.log("Nothing Typed")
    }
  }, [search])

  // Variable to convert user input into lowercase string and remove any whitespace around it 
  const normalizedSearch = search.trim().toLowerCase()

  // Derived Data: variable to hold filtered list of countries
  const filteredCountries = 
    !countries || normalizedSearch === ""   // checks if countries or user input is empty
      ? []                            // if so set to empty array
      : countries.filter((country) => (
          country.name.common.toLowerCase().includes(normalizedSearch)  // if not, pick out countries that include user input as substring in country name
      ))
  

  // Updates the search string when user changes input field characters
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  return (
    <>
      <h1>Search for a Country</h1>
      <form>
        <input value={search} onChange={handleSearchChange} />
      </form>
      <div>
        <Countries countryList={filteredCountries} />
      </div>
    </>
  )
}

export default App
