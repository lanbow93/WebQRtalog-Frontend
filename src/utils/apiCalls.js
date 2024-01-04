import url from '../router/url.js'

export async function login(userData) {
    try {
        const response = await fetch(url + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: userData,
        })

        if (response.ok) {
            return { data: await response.json() }
        } else {
            return { error: await response.json() }
        }
    } catch (error) {
        return { error }
    }
}