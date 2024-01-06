import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { singleAsset } from '../utils/apiCalls'
import Loading from '../components/Loading.jsx'
import HiddenModal from '../components/HiddenModal.jsx'
import { capitalizeWords } from '../utils/SharedFunctions.js'
import { assetButtons } from '../utils/jsonDetails.json'
import useCheckUserSession from '../utils/useCheckUserSession.jsx'
import QRCode from 'react-qr-code'

function Asset() {
    useCheckUserSession()
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [assetData, setAssetData] = useState()
    const [modalData, setModalData] = useState({
        status: '',
        message: '',
        additional: '',
    })
    const { id } = useParams()

    const getAssetData = async () => {
        setIsLoading(true)
        const response = await singleAsset(id)
        setIsLoading(false)
        if (response.data) {
            setAssetData({ ...response.data.data })
            console.log(assetData)
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
        getAssetData()
        return () => {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading | !assetData) {
        return <Loading />
    }
    return (
        <div className="asset">
            <div className={`modalSection ${isModalActive ? '' : 'hidden'}`}>
                <HiddenModal
                    status={modalData.status}
                    message={modalData.message}
                    error={modalData.additional}
                    closeModal={setIsModalActive}
                />
            </div>
            <h1>{capitalizeWords(assetData.productName)}</h1>
            <div className="qrCode">
                <QRCode value={assetData.qrCode} className="qrImage" />
                {/* {assetData.barcode === '' ? (
                    <img
                        className="qrImage"
                        src="/noBarcode.png"
                        alt={`Stored Barcode: ${assetData.barcode}`}
                    />
                ) : (
                    ''
                )} */}
            </div>
            <div className="moreDetails">
                <section>
                    <label>Category:</label>
                    <p>{capitalizeWords(assetData.category)}</p>
                </section>
                <section>
                    <label>Serial:</label>
                    <p>{assetData.serialNumber.toUpperCase()}</p>
                </section>
                <section className="assignee">
                    <label>Current Assignee:</label>
                    <p>{assetData.currentAssignee}</p>
                </section>
            </div>
            <div className="buttonOptions">
                {assetButtons.map((option) => (
                    <Link to={option[1] + id} key={option[1] + option[2]}>
                        <button>{option[0]}</button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Asset
