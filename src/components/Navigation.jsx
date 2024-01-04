import { useState } from 'react'
import { Link } from 'react-router-dom' // Import Link from react-router-dom
import { navLinks } from '../utils/jsonDetails.json'

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <nav className="navigation">
            <Link to="/" className='heading'><h1>WebQRtalog</h1></Link>
            <div
                className={`container ${menuOpen ? 'change' : ''}`}
                onClick={handleMenuToggle}
            >
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <div className={`navOptions ${menuOpen ? 'open' : 'closed'}`}>
                <ul>
                    {navLinks.map((linkInfo) => (
                        <li key={linkInfo[1]}>
                            <Link to={linkInfo[1]}>{linkInfo[0]}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navigation
