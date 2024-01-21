import axios from 'axios'

const getApiBaseUrl = (base: string) => `http://${base}/`

export const axiosInstance = axios.create({
    baseURL: getApiBaseUrl('localhost:3001'),
    headers: {
        'Content-Type': 'application/json'
    }
})
