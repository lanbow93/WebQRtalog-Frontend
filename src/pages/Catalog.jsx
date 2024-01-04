import { useState, useEffect } from 'react'
import LoadingScreen from '../components/Loading.jsx'
import HiddenModal from '../components/HiddenModal.jsx'

import { assetsCall } from '../utils/apiCalls'

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
    if (isLoading) {
        return <LoadingScreen />
    }
    console.log(assetData)
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
            <div className="line1"></div>
        </div>
    )
}

export default Catalog
