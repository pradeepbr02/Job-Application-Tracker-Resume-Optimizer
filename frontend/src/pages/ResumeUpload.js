import { uploadResume } from "../apis/resumeApi.js";
import { useState } from "react";
const ResumeUpload = ()=>{
    const [file ,setFile] = useState(null)
    const [message , setMessage] = useState('')

    const handleUpload = async(e)=>{
        e.preventDefault()
        if(!file) return 
        try{
            await uploadResume(file)
            setMessage("Resume Uploaded successfully")
        }
        catch{
            setMessage("Upload Failed")
        }
    }
    return (
        <div>
        <h2>Upload Resume</h2>

        <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button>Upload</button>
      </form>

      {message && <p>{message}</p>}
    </div>
    )
}

export default ResumeUpload