const Countries = ( {countryList} ) => {
    
    // Condition 1: If filtered list received is empty
    if(countryList.length === 0){
        return <p>Nothing Yet</p>
    } 
    // Condition 2: If list has more than 10 countries
    else if(countryList.length > 10) {
        return (
            <p>Please be more specific</p>
        )
    } 
    // Condition 3: If list consists of only 1 matched country
    else if(countryList.length === 1) {
        const country = countryList[0]
        const countryLanguages = Object.values(country.languages)   // use Object constructor method to get all values in languages object

        return(
            <>
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {countryLanguages.map((lan) => (
                        <li>{lan}</li>
                    ))}
                </ul>
                <img src= {country.flags.png}/>
            </>
        )
    }
    
    // Condition 5: number of matched countries is 2-10
    return(
        <ul>
            {countryList.map((country) => (
                <li key={country.area}>{country.name.common}</li>
            ))}
        </ul>
    )
}

export default Countries