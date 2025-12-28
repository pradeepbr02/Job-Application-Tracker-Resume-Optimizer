import multer from "multer";
import path from 'path';
import fs from 'fs'


const uploadDir = 'uploads/resumes'

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir , {recursive:true})
}

const storage = multer.diskStorage({
    destination : (req , file , cb)=>{
        cb(null , uploadDir)
    },

    filename : (req , file , cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1e9)
        cb(null , uniqueSuffix + path.extname(file.originalname))
    }
    
})

const fileFilter = (req , file , cb)=>{
    let allowedTypes = ['.pdf' , '.doc' , '.docx']
    const ext = path.extname(file.originalname).toLowerCase()
    if(allowedTypes.includes(ext)){
        cb(null , true)
    }
    else{
        cb(new Error('Invalid file type. Only PDF , DOC , DOCX file types are allowed'))
    }
}

export const upload = multer({
    storage ,
    fileFilter ,
    limits :{
        fileSize : 2*1024*1024 //2mb
    }
})