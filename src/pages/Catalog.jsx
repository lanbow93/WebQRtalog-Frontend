import { useState, useEffect } from 'react'
import LoadingScreen from '../components/Loading.jsx'
import HiddenModal from '../components/HiddenModal.jsx'
import { assetsCall } from '../utils/apiCalls'
import CatalogLine from '../components/CatalogLine.jsx'

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
                {assetData.map((asset, index) => (
                    <CatalogLine
                        {...asset}
                        index={index}
                        key={asset.productName + index}
                    />
                ))}
                <div className="line ending"></div>
            </div>
        </div>
    )
}

export default Catalog
