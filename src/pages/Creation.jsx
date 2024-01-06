import { useState } from 'react'
import { useNavigate } from 'react-router'
import { createAsset } from '../utils/apiCalls'
import LoadingScreen from '../components/Loading'
import useCheckUserSession from '../utils/useCheckUserSession'
import HiddenModal from '../components/HiddenModal'

function Creation() {
    useCheckUserSession()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [assetData, setAssetData] = useState({
        productName: '',
        category: '',
        quantity: 1,
        serialNumber: '',
    })
    const [modalData, setModalData] = useState({
        status: '',
        message: '',
        additional: '',
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setAssetData({ ...assetData, [name]: value })
    }
    const handleSubmission = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const response = await createAsset(assetData)
        setIsLoading(false)
        if (response.data) {
            navigate(`/inventory/catalog/${response.data.data.newItem._id}`)
        } else {
            const { status, message, error } = response.error
            setModalData({
                status: status,
                message: message,
                additional: error,
            })
            setAssetData({
                productName: '',
                category: '',
                quantity: 1,
                serialNumber: '',
            })
            setIsModalActive(true)
        }
    }
    if (isLoading) {
        return <LoadingScreen />
    }
    return (
        <div className="creation">
            <div className={`modalSection ${isModalActive ? '' : 'hidden'}`}>
                <HiddenModal
                    status={modalData.status}
                    message={modalData.message}
                    error={modalData.additional}
                    closeModal={setIsModalActive}
                />
            </div>
            <form onSubmit={handleSubmission}>
                <h1>Asset Creation</h1>
                <label>Product Name:</label>
                <input
                    required
                    type="text"
                    name="productName"
                    value={assetData.name}
                    onChange={handleInputChange}
                />
                <label>Category:</label>
                <input
                    required
                    type="text"
                    name="category"
                    value={assetData.category}
                    onChange={handleInputChange}
                />
                <label>Quantity:</label>
                <input
                    required
                    type="number"
                    name="quantity"
                    value={assetData.quantity}
                    onChange={handleInputChange}
                />
                <label>Serial Number:</label>
                <input
                    required
                    type="text"
                    name="serialNumber"
                    value={assetData.serialNumber}
                    onChange={handleInputChange}
                />
                <button>Create</button>
            </form>
        </div>
    )
}

export default Creation
