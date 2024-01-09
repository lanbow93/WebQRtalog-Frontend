import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import LoadingScreen from '../components/Loading.jsx'
import HiddenModal from '../components/HiddenModal.jsx'
import { viewChainHistory } from '../utils/apiCalls'
import useCheckUserSession from '../utils/useCheckUserSession.jsx'
import AssetChainLine from '../components/AssetChainLine.jsx'

function AssetChain() {
    useCheckUserSession()
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [assetData, setAssetData] = useState([])
    const [modalData, setModalData] = useState({
        status: '',
        message: '',
        additional: '',
    })
    const { id } = useParams()
    const [sortOrder, setSortOrder] = useState('asc') // or 'desc' for descending

    useEffect(() => {
        getAssets()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAssets = async () => {
        setIsLoading(true)
        const response = await viewChainHistory(id)
        console.log(response)
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
        <div className="assetChain">
            <div className={`modalSection ${isModalActive ? '' : 'hidden'}`}>
                <HiddenModal
                    status={modalData.status}
                    message={modalData.message}
                    error={modalData.additional}
                    closeModal={setIsModalActive}
                />
            </div>
            <h1>Asset Chain</h1>
            <div className="assetsSection">
                <div className="line heading">
                    <p onClick={() => handleSort('productName')}>Date</p>
                    <p
                        className="desktopView"
                        onClick={() => handleSort('currentAssignee')}
                    >
                        Action:
                    </p>
                    <p onClick={() => handleSort('category')}>Possesor</p>
                    <p>Asset Manager</p>
                </div>
                {assetData.possessionHistory.map((asset, index) => (
                    <AssetChainLine
                        {...asset}
                        index={index}
                        key={asset.assetId + 'key' + index}
                    />
                ))}
                <div className="line ending"></div>
            </div>
        </div>
    )
}

export default AssetChain
