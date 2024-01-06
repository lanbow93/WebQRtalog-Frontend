import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAsset, getCategories } from '../utils/apiCalls'
import LoadingScreen from '../components/Loading'
import useCheckUserSession from '../utils/useCheckUserSession'
import HiddenModal from '../components/HiddenModal'
import { useEffect } from 'react'

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
    const [categories, setCategories] = useState([])
    const [modalData, setModalData] = useState({
        status: '',
        message: '',
        additional: '',
    })

    const retrieveCategories = async () => {
        setIsLoading(true)
        const response = await getCategories()
        setIsLoading(false)
        if (response.data) {
            await setCategories(response.data.data)
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
    useEffect(() => {
        retrieveCategories()
        return () => {}
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setAssetData({ ...assetData, [name]: value })
    }

    const handleSubmission = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const dataToSubmit = { ...assetData }
        if (assetData.other) {
            dataToSubmit.category = assetData.other
        }
        const response = await createAsset(dataToSubmit)

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
    if (isLoading || categories.length === 0) {
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
                    value={assetData.productName}
                    onChange={handleInputChange}
                />
                <label>Category:</label>
                <select
                    required
                    name="category"
                    value={assetData.category}
                    onChange={handleInputChange}
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {categories.map((category, index) => (
                        <option value={category} key={category + index}>
                            {category}
                        </option>
                    ))}
                    <option value="Other">Other</option>
                </select>
                {assetData.category === 'Other' && (
                    <>
                        <label>Enter Category:</label>
                        <input
                            required
                            type="text"
                            name="other"
                            placeholder="Enter other category"
                            value={assetData.other}
                            onChange={handleInputChange}
                        />
                    </>
                )}
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
                <div className="ending"></div>
            </form>
        </div>
    )
}

export default Creation
