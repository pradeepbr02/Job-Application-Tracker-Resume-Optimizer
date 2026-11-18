import axios from 'axios'

const apiOrigin = (process.env.REACT_APP_API_URL || 'http://localhost:5000')
    .trim().replace(/\/+$/, '');

const axiosInstance = axios.create({
    baseURL: `${apiOrigin}/api/v1`,
    withCredentials: true,   
    headers: {
        'Content-Type': 'application/json'
    }
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config; 
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response)=> response , 
    (error)=>{
        
        if(error.response?.status === 401){
            console.warn('Token expired or Invalid...Logging out')
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
