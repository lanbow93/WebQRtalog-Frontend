import './app.scss'
import { Outlet } from 'react-router-dom'
import Navigation from './components/Navigation'
import { Helmet } from 'react-helmet'

function App() {
    return (
        <div className="App">
            <Helmet>
                <title>WebQRtalog - Inventory Management System</title>
                <meta
                    name="description"
                    content="WebQRtalog is an inventory management system that allows you to track and manage products efficiently. Explore the catalog of items with detailed information and QR codes for easy identification."
                />
                <meta
                    property="og:title"
                    content="WebQRtalog - Inventory Management System"
                />
                <meta
                    property="og:description"
                    content="WebQRtalog is an inventory management system that allows you to track and manage products efficiently. Explore the catalog of items with detailed information and QR codes for easy identification."
                />
                <meta property="og:image" content="/WebQRtalog.png?url" />
            </Helmet>
            <Navigation />
            <Outlet />
        </div>
    )
}

export default App
