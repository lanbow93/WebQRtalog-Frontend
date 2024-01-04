import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'

import App from '../App'
import LoadingScreen from '../components/LoadingScreen'
import LoginPage from '../pages/LoginPage'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/loading" element={<LoadingScreen />} />
        </Route>
    )
)

export default router
