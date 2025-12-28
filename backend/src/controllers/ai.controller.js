import Application from '../models/application.model.js'
import Resume from '../models/resume.model.js'
import { analyzeResume } from '../services/ai.services.js'

export const analyzeLatestResume = async (req , res)=>{
    try{
        const {id} = req.params

        const application  = await Application.findOne(
            {_id : id , user : req.user}
        )

        if(!application) return res.status(404).json({message : "No application found"})

        if(application.aiAnalysis.length!=0 && application.aiScore){
            return res.status(200).json({
                score: application.aiScore,
                analysis: application.aiAnalysis,
            })
        }
        const latestResume = await Resume.findOne({
            user : req.user
        }).sort({createdAt : -1})

        if(!latestResume) return res.status(400).json({message : "Please upload resume before analysis"})

        const analysis = await analyzeResume(latestResume.parsedText , application.jobDescription)

        application.aiScore = analysis.matchScore

        application.aiAnalysis ={
            strengths: analysis.strengths,
            weaknesses: analysis.weaknesses,
            missingSkills: analysis.missingSkills,
            suggestions: analysis.suggestions
        }

        await application.save()

         return res.status(200).json({
        message: 'Resume analyzed successfully',
        resumeUsed: latestResume.fileName,
        score: application.aiScore,
        analysis: application.aiAnalysis,
    })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Server error"})
    }
}