import { dateConverter } from '../utils/SharedFunctions'
import useCheckUserSession from '../utils/useCheckUserSession'

function Home(props) {
    useCheckUserSession()
    const storedUserDetails = sessionStorage.getItem('qrUserDetails')
    const userDetails = JSON.parse(storedUserDetails)
    const { badgeName, timeStamp } = userDetails

    return (
        <div className="home">
            <h1>Welcome {badgeName}</h1>
            <h3>Login Renewal:</h3>
            <p>
                {dateConverter(
                    new Date(timeStamp).getTime() + 2 * 60 * 60 * 1000
                )}
            </p>
            <div className="buttonOptions">
                <button>Assign Equipment</button>
                <button>Review Inventory</button>
            </div>
        </div>
    )
}

export default Home
