import { useState, useEffect } from 'react'
import applicantsServices from './services/applicants.js'
import Applicant from './components/Applicant.jsx'
// import './App.css'

function App() {
  const [applicants, setApplicants] = useState([])
  const [search, setSearch] = useState('')
  const [searchedApp, setSearchedApp] = useState({})

  useEffect(() => {
    applicantsServices.getAll().then((initialApplicants) => {
      setApplicants(applicants.concat(initialApplicants))
    })
    console.log("Loading in initial applicants")
  }, [])

  const searchApplicant = (event) => {
    event.preventDefault()
    setSearchedApp({})

    applicantsServices.getOne(search).then((applicant) => {
      if(applicant) {
        setSearchedApp(applicant)
      }
    })
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  return (
    <>
      <div>
          {applicants.map((applicant) => (
            <Applicant key={applicant.id} person={applicant} />
          ))}
      </div>
      <form onSubmit={searchApplicant}>
          <input value={search} onChange={handleSearchChange}/>
          <button type='submit'>Search</button>
      </form>
      <div>
          <Applicant key={searchedApp.id} person={searchedApp} />
      </div>
    </>
  )
}

export default App
