import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HiddenModal from '../components/HiddenModal.jsx'
import LoadingScreen from '../components/Loading.jsx'
import { signup } from '../utils/apiCalls.js'

function Signup() {
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [modalData, setModalData] = useState({
        status: '',
        message: '',
        additional: '',
    })
    const [userData, setUserData] = useState({
        username: '',
        badgeName: '',
        email: '',
        password: '',
        verifyPassword: '',
    })
    const navigate = useNavigate()

    const handleSubmission = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        if (userData.password !== userData.verifyPassword) {
            setIsLoading(false)
            setModalData({
                status: 'Failed To Sign Up',
                message: 'Passwords Did Not Match',
                additional: 'Try Again',
            })
            setIsModalActive(true)
            return
        }
        const response = await signup(JSON.stringify(userData))
        setIsLoading(false)
        if (response.data) {
            navigate('/login')
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

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUserData({ ...userData, [name]: value })
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <div className="signup">
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
                    <h2>New User Creation</h2>
                    <label>Username:</label>
                    <input
                        required
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                    />
                    <label>Badge Name:</label>
                    <input
                        required
                        type="text"
                        name="badgeName"
                        value={userData.badgeName}
                        onChange={handleInputChange}
                    />
                    <label>E-Mail:</label>
                    <input
                        required
                        type="email"
                        name="email"
                        value={userData.email}
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
                    <label>Verify Password:</label>
                    <input
                        required
                        type="password"
                        name="verifyPassword"
                        value={userData.verifyPassword}
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

export default Signup
