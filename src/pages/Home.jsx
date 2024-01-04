import useCheckUserSession from '../utils/useCheckUserSession'

function Home(props) {
    useCheckUserSession()
    return (
        <div className="home">
            <h1>Home</h1>
        </div>
    )
}

export default Home
