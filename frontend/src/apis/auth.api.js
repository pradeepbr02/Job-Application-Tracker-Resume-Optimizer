import axiosInstance from "./axios.instance.js";

export const loginUser = async (credentials)=>{
    try{
        const response = await axiosInstance.post('/login' , credentials)
        console.log(response)
        return response.data
    }
    catch(error){
        if(error.response){
            console.log(error)
            throw new Error(error.response.data.message || 'Login failed')
        }
        else{
            console.log(error)
            throw new Error('Server Unreachable')
        }
    }
}