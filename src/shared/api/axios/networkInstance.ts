import axios from 'axios'

const getApiBaseUrl = (base: string) => `http://${base}/`

export const axiosInstance = axios.create({
    baseURL: getApiBaseUrl('192.168.65.67:3001'),
    headers: {
        'Content-Type': 'application/json'
    }
})
