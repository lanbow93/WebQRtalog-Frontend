import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { singleAsset } from '../utils/apiCalls'
import Loading from '../components/Loading.jsx'
import HiddenModal from '../components/HiddenModal.jsx'

function Asset() {
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [assetData, setAssetData] = useState()
    const [modalData, setModalData] = useState({
        status: '',
        message: '',
        additional: '',
    })
    const { id } = useParams()
    useEffect(() => {
        getAssetData()
        return () => {}
    }, [])
    const getAssetData = async () => {
        setIsLoading(true)
        const response = await singleAsset(id)
        setIsLoading(false)
        if (response.data) {
            console.log(response.data)
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
        return <Loading />
    }
    return (
        <div className="asset">
            <h1>Asset</h1>
        </div>
    )
}

export default Asset
