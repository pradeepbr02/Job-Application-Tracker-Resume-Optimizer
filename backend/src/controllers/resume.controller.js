import Resume from '../models/resume.model.js'
import { parsePDF } from '../utils/pdf.parser.js'

export const uploadResume = async(req ,res)=>{
    try{
        if(!req.file) return res.status(404).json({message : "Resume not found"})

        const countResume = await Resume.countDocuments({
            user : req.user
        })
        const parsedText = await parsePDF(req.file.path)
        const resume = await Resume.create({
            user : req.user , 
            fileName : req.file.originalname ,
            filePath : req.file.path ,
            parsedText : parsedText,
            version  : countResume+1
        })
        
        return res.status(200).json(
            {message : "Resume Uploaded successully",
            resume
        })

    }
    catch(err){
            console.log(err)
            return res.status(500).json({message : "Internal Server message"})
    }
}


export const getResumes = async(req , res)=>{
    try{
        const getResume = await Resume.find({
            user : req.user
        }).sort({createdAt : -1})

        return res.status(200).json({message : "Fetched the resumes " , getResume})
   
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal server error"})
    }
}