import axiosInstance from "./axios.instance";

export const uploadResume = async(file)=>{
    const formData = new FormData()
    formData.append('resume' , file)
    const res = await axiosInstance.post('/upload/resume' , formData , {
        headers :{'Content-Type': 'multipart/form-data'}
    })
    return res.data
}