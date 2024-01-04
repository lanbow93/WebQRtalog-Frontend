import { useState, useEffect } from 'react'
import LoadingScreen from '../components/Loading.jsx'
import HiddenModal from '../components/HiddenModal.jsx'
import { Link } from 'react-router-dom'
import { assetsCall } from '../utils/apiCalls'
import { capitalizeWords } from '../utils/SharedFunctions.js'

function Catalog() {
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [assetData, setAssetData] = useState([])
    const [modalData, setModalData] = useState({
        status: '',
        message: '',
        additional: '',
    })

    useEffect(() => {
        getAssets()
    }, [])

    const getAssets = async () => {
        setIsLoading(true)
        const response = await assetsCall()

        setIsLoading(false)
        if (response.data) {
            setAssetData(response.data.data)
        } else {
            const { status, message, error } = response.error
            setModalData({
                status: status,
                message: message,
                additional: error,
            })
            setIsModalActive(true)
        }
    }
    if (isLoading || assetData.length === 0) {
        return <LoadingScreen />
    }
    const renderAssetLines = () => {
        return assetData.map((asset, index) => (
            <div
                key={index}
                className={`line ${index % 2 === 0 ? 'even' : 'odd'}`}
            >
                <p>{capitalizeWords(asset.productName)}</p>
                <p>{asset.currentAssignee}</p>
                <p className="desktopView">{asset.category}</p>
                <Link to={`/inventory/catalog/${asset._id}`}>
                    <button>✓</button>
                </Link>
            </div>
        ))
    }
    return (
        <div className="catalog">
            <div className={`modalSection ${isModalActive ? '' : 'hidden'}`}>
                <HiddenModal
                    status={modalData.status}
                    message={modalData.message}
                    error={modalData.additional}
                    closeModal={setIsModalActive}
                />
            </div>
            <h1>Catalog</h1>
            <div className="assetsSection">
                <div className="line heading">
                    <p>Product Name</p>
                    <p>Current Assignee</p>
                    <p className="desktopView">Category</p>
                    <p>More Details</p>
                </div>
                {renderAssetLines()}
                <div className="line ending"></div>
            </div>
        </div>
    )
}

export default Catalog
