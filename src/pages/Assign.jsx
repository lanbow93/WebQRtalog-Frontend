import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { useNavigate } from 'react-router'
import useCheckUserSession from '../utils/useCheckUserSession'

function Assign() {
    useCheckUserSession()
    const [data, setData] = useState('')
    const navigate = useNavigate()
    if (data) {
        navigate(`/assign/${data.split('+++')[1]}`)
        setData('')
    }
    return (
        <div className="assign">
            <h1>Assign By QR</h1>
            <p>Please Scan Item</p>
            <QrReader
                scanDelay={1000}
                onResult={(result, error) => {
                    if (result) {
                        setData(result?.text)
                    }

                    if (error) {
                        console.info(error)
                    }
                }}
                className="scanner"
            />
        </div>
    )
}

export default Assign
