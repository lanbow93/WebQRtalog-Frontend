import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'

import App from '../App'
import Loading from '../components/Loading'
import Login from '../pages/Login'
import Landing from '../pages/Landing'
import Home from '../pages/Home'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/loading" element={<Loading />} />
        </Route>
    )
)

export default router
