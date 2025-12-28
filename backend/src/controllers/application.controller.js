import Application from '../models/application.model.js'

export  const createApplication = async(req , res)=>{
    try{
        const {company , role , jobdescription} = req.body
        if(!company || !role || !jobdescription) return res.status(400).json({message : "Company, role & descriptions are mandatory fields"})
        
        const application = await Application.create({
            user : req.user ,
            company,
            role ,  
            jobDescription:jobdescription
        })

        return res.status(200).json({message : "Application Created" , application})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Server Error"})
    }
    
}

export const getApplications = async (req , res)=>{
    try{
        const applications  = await Application.find({
            user : req.user,
        }).sort({appliedDate:-1})
        
        return res.status(200).json({message : "Find the applications" , applications})
    }

    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Server Error"})
    }
}

export const updateJobApplicationStatus = async (req , res)=>{
    try{
        const {status} = req.body
        const allowedStatus = [
            'Applied', 
            'Interview',
            'Offer' ,
            'Rejected'
        ]
        if(!allowedStatus.includes(status)) return res.status(400).json({message : `${status} is not an valid status`})
        const application = await Application.findOneAndUpdate(
            {_id : req.params.id , user : req.user},
            {status} ,
            {new : true}
    )
        if(!application) return res.status(404).json({message : "Application Not found"})

        return res.status(200).json({message : "Job application status changed"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Server Error"})
    }
}


export const updateApplicationNotes = async(req , res)=>{
    try{
        const {text} = req.body
        if(!text) return res.status(400).json({message : "Note field cannot be empty"})

        const application = await Application.findOne(
            {_id : req.params.id , user : req.user} ,

        )
        if(!application) return res.status(404).json({message : "Application not found"})

        application.notes.push({text})
        await application.save()
        return res.status(201).json({message : "Note saved for the application"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal server error"})
    }
}

export const deleteApplication = async(req , res)=>{
    try{
        const applications = await Application.find({_id : req.params.id , user : req.user})
        if(!applications) return res.status(404).json({message : "Application Not FOund"})
        
        await Application.deleteOne({_id : req.params.id, user:req.user})
        return res.status(200).json({message : "Application Deleted Successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Server Error"})
    }
}

export const getApplicationNotes = async(req, res)=>{
    try{
        const {appId} = req.params
        const application = await  Application.findOne({
            user : req.user ,
            _id  : appId

        })
        if(!application) return res.status(404).json({message : "Application not found"})
        
        return res.status(200).json(application.notes)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Server error"})
    }
}