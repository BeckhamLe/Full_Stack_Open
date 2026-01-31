const Applicant = ({person}) => {
    
    return (
        <ul>
            <li>{person.name}</li>
            <li>{person.age}</li>
            <li>{person.position}</li>
        </ul>
    )
}

export default Applicant