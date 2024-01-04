import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HiddenModal from '../components/HiddenModal.jsx'
import LoadingScreen from '../components/Loading.jsx'
import { login } from '../utils/apiCalls.js'

function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [modalData, setmodalData] = useState({
        status: '',
        message: '',
        additional: '',
    })
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    })
    const navigate = useNavigate()

    const handleSubmission = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const response = await login(JSON.stringify(userData))
        setIsLoading(false)
        if (response.data) {
            const qrUserDetails = {
                badgeName: response.data.data,
                timeStamp: new Date(),
            }
            sessionStorage.setItem(
                'qrUserDetails',
                JSON.stringify(qrUserDetails)
            )
            navigate('/home')
        } else {
            const { status, message, error } = response.error
            setmodalData({
                status: status,
                message: message,
                additional: error,
            })
            sessionStorage.removeItem('qrUserDetails')
            setIsModalActive(true)
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUserData({ ...userData, [name]: value })
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <div className="login">
                <div
                    className={`modalSection ${isModalActive ? '' : 'hidden'}`}
                >
                    <HiddenModal
                        status={modalData.status}
                        message={modalData.message}
                        error={modalData.additional}
                        closeModal={setIsModalActive}
                    />
                </div>

                <form onSubmit={handleSubmission}>
                    <h2>Login</h2>
                    <label>Username:</label>
                    <input
                        required
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                    />
                    <label>Password:</label>
                    <input
                        required
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="activated">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login
