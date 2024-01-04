import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HiddenModal from '../components/HiddenModal.jsx'
import LoadingScreen from '../components/LoadingScreen.jsx'
import { login } from '../utils/apiCalls.js'

function LoginPage() {
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
            navigate('/homepage')
        } else {
            const { status, message, error } = response.error
            setmodalData({
                status: status,
                message: message,
                additional: error,
            })
            console.log(response.error)
            setIsModalActive(true)
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUserData({ ...userData, [name]: value })
    }

    return (
        <>
            <div className="loginPage">
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

                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <form onSubmit={handleSubmission}>
                        <h2>Admin Login</h2>
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
                )}
            </div>
        </>
    )
}

export default LoginPage