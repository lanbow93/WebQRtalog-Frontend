import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assignAsset, singleAsset } from '../utils/apiCalls'
import Loading from '../components/Loading.jsx'
import HiddenModal from '../components/HiddenModal.jsx'
import { capitalizeWords } from '../utils/SharedFunctions.js'
import useCheckUserSession from '../utils/useCheckUserSession.jsx'
import QRCode from 'react-qr-code'

function IssueAsset() {
    useCheckUserSession()
    const storedUserDetails = sessionStorage.getItem('qrUserDetails')
    let badgeName
    if (storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails)
        badgeName = userDetails.badgeName
    }
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [assetData, setAssetData] = useState()
    const [assignee, setAssignee] = useState('')
    const [modalData, setModalData] = useState({
        status: '',
        message: '',
        additional: '',
    })
    const { id } = useParams()
    const navigate = useNavigate()

    const getAssetData = async () => {
        setIsLoading(true)
        const response = await singleAsset(id)
        setIsLoading(false)
        if (response.data) {
            setAssetData({ ...response.data.data })
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

    const handleSubmission = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const dataToSubmit = {
            badgeName: badgeName,
            action: assignee ? 'Issued' : 'Returned',
            possesor: assignee ? assignee : 'Asset Management',
        }

        const response = await assignAsset(id, dataToSubmit)
        setIsLoading(false)

        if (response.data) {
            navigate(`/inventory/catalog/${assetData._id}`)
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

    useEffect(() => {
        getAssetData()
        return () => {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading | !assetData) {
        return <Loading />
    }
    return (
        <div className="issueAsset">
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
                <QRCode
                    value={assetData.qrCode + '+++' + assetData._id}
                    className="qrImage"
                />
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
                {assetData.currentAssignee === 'Asset Management' ? (
                    <>
                        <form>
                            <label className="bold" htmlFor="">
                                New Assignee:{' '}
                            </label>
                            <input
                                type="text"
                                name="assignee"
                                value={assignee}
                                onChange={(e) => setAssignee(e.target.value)}
                            />
                        </form>
                        <button onClick={handleSubmission}>Assign</button>
                    </>
                ) : (
                    <button onClick={handleSubmission}>Return</button>
                )}
            </div>

            <div className="buttonOptions"></div>
        </div>
    )
}

export default IssueAsset
