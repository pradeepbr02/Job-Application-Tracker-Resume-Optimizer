import axiosInstance from "./axios.instance.js";

export const getApplications = async()=>{
    const response = await axiosInstance.get('/get/applications')
    return response.data.applications
}

export const createApplication =async(data)=>{
    const response = await axiosInstance.post('/create/application' , data)
    return response.data
}

export const deleteApplication  = async(id)=>{
    const response = await axiosInstance.delete(`/delete/application/${id}`)
    return response.data
}

export const updateJobApplicationStatus = async(id , status)=>{
    const response = await axiosInstance.put(`/update/application/${id}/status`  , {status}) //axios expects body to be in json , in create application its send as {} in the function
    return response.data
}

export const updateJobApplicationNotes = async(id , text)=>{
    const response = await axiosInstance.put(`/update/application/${id}/notes` , {text})

    return response.data
}

export const getApplicationNotes = async(id)=>{
    const response = await axiosInstance.get(`get/${id}/application/notes`)
    return response.data
}

export const resumeAnalyze = async(id)=>{
    const response = await axiosInstance.post(`analyze/resume/${id}`)
    return response.data
}