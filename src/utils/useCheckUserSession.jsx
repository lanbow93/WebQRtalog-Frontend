import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useCheckUserSession = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const storedUserDetails = sessionStorage.getItem('qrUserDetails')

        if (!storedUserDetails) {
            navigate('/login')
            return
        }

        const userDetails = JSON.parse(storedUserDetails)
        const { badgeName, timeStamp } = userDetails

        // Check if it has been more than 2 hours (2 hours * 60 minutes * 60 seconds * 1000 milliseconds)
        const twoHoursInMilliseconds = 2 * 60 * 60 * 1000
        const currentTime = new Date().getTime()

        if (
            !badgeName ||
            !timeStamp ||
            currentTime - timeStamp > twoHoursInMilliseconds
        ) {
            navigate('/session-expired')
        }
    }, [navigate])
    return null
}

export default useCheckUserSession
