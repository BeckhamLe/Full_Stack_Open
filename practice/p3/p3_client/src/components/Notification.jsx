const Notification = ( {message, flag} ) => {
    if(message === null) {
        return null
    } else if (flag === true){
        return (
            <div className="error">
                {message}
            </div>
        )
    }

    return (
        <div className="success">
            {message}
        </div>
    )
}

export default Notification