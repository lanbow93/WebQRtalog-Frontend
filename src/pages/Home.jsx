import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="home">
            <h1>Welcome to WebQRtalog</h1>
            <p className="subtitle">
                Explore a diverse catalog of inventory items!
            </p>
            <div className="about">
                <h3>About WebQRtalog</h3>
                <p>
                    WebQRtalog is your go-to platform for managing and exploring
                    inventory items. Whether you&apos;re tracking assets or
                    managing equipment, our platform provides a seamless
                    experience.
                </p>
                <p>
                    Our mission is to simplify inventory management and enhance
                    collaboration. With features like possession tracking and
                    detailed item information, WebQRtalog ensures a smooth and
                    efficient process.
                </p>

                <p>
                    Dive into the details of each item, track possession
                    history, and make informed decisions. WebQRtalog is designed
                    to empower users with a user-friendly interface and robust
                    functionality.
                </p>
            </div>
            <Link to="/login" className="loginLink">
                Login
            </Link>
        </div>
    )
}

export default Home
