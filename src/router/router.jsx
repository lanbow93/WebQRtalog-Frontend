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
import Inventory from '../pages/Inventory'
import Catalog from '../pages/Catalog'
import Asset from '../pages/Asset'
import Creation from '../pages/Creation'
import Edit from '../pages/Edit'
import Assign from '../pages/Assign'
import IssueAsset from '../pages/IssueAsset'
import Signup from '../pages/Signup'
import AssetChain from '../pages/AssetChain'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/assign" element={<Assign />} />
            <Route path="/assign/:id" element={<IssueAsset />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/add" element={<Creation />} />
            <Route path="/inventory/edit/:id" element={<Edit />} />
            <Route path="/inventory/catalog" element={<Catalog />} />
            <Route path="/inventory/catalog/:id" element={<Asset />} />
            <Route path="/inventory/assetchain/:id" element={<AssetChain />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/loading" element={<Loading />} />
        </Route>
    )
)

export default router
