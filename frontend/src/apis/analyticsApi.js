import axiosInstance from './axios.instance.js'

export const fetchDashboardAnalytics = async()=>{
    const resp = await axiosInstance.get('/analytics')
    return resp.data
}