const Worker = ({name, age, position}) => {
    return (
        <ul className="worker">
            <li>{name}</li>
            <li>{age}</li>
            <li>{position}</li>
        </ul>
    )
}

export default Worker