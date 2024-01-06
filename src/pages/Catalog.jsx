import { useState, useEffect } from 'react'
import LoadingScreen from '../components/Loading.jsx'
import HiddenModal from '../components/HiddenModal.jsx'
import { assetsCall } from '../utils/apiCalls'
import CatalogLine from '../components/CatalogLine.jsx'
import useCheckUserSession from '../utils/useCheckUserSession.jsx'

function Catalog() {
    useCheckUserSession()
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [assetData, setAssetData] = useState([])
    const [modalData, setModalData] = useState({
        status: '',
        message: '',
        additional: '',
    })
    const [sortOrder, setSortOrder] = useState('asc') // or 'desc' for descending

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

    const handleSort = (key) => {
        // Toggle between ascending and descending order
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
        setSortOrder(newSortOrder)

        // Sort the assetData array based on the selected key and order
        const sortedData = assetData.slice().sort((a, b) => {
            const valueA = a[key]
            const valueB = b[key]

            if (valueA < valueB) {
                return sortOrder === 'asc' ? -1 : 1
            }
            if (valueA > valueB) {
                return sortOrder === 'asc' ? 1 : -1
            }
            return 0
        })

        setAssetData(sortedData)
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
                    <p onClick={() => handleSort('productName')}>
                        Product Name
                    </p>
                    <p onClick={() => handleSort('currentAssignee')}>
                        Current Assignee
                    </p>
                    <p
                        className="desktopView"
                        onClick={() => handleSort('category')}
                    >
                        Category
                    </p>
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
