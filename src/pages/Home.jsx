import { Link } from 'react-router-dom'
import { dateConverter } from '../utils/SharedFunctions'
import useCheckUserSession from '../utils/useCheckUserSession'
import { homeButtons } from '../utils/jsonDetails.json'

function Home() {
    useCheckUserSession()
    const storedUserDetails = sessionStorage.getItem('qrUserDetails')
    let badgeName, timeStamp
    if (storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails)
        badgeName = userDetails.badgeName
        timeStamp = userDetails.timeStamp
    }

    return (
        <div className="home">
            <h1>
                Welcome,
                <br />
                {badgeName}
            </h1>
            <h3>Login Renewal:</h3>
            <p>
                {dateConverter(
                    new Date(timeStamp).getTime() + 2 * 60 * 60 * 1000
                )}
            </p>
            <div className="buttonOptions">
                {homeButtons.map((option) => (
                    <Link to={option[1]} key={option[1] + option[2]}>
                        <button>{option[0]}</button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home
