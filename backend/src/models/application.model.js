import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' ,
        require : true
    } ,
    company :{
        type : String , 
        require : true,
        trim : true
    } ,
    role:{
        type : String ,
        require : true  ,
        trim : true
    },
    jobDescription :{
        type : String ,
        require: true,

    } ,
    status :{
        type : String , 
        enum :['Applied' , 'Interview' , 'Offer' , 'Rejected'],
        default : 'Applied'
    },
    appliedDate :{
        type : Date,
        defaule : Date.now
    },
   notes: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    aiAnalysis :{
        strengths:[String] ,
        weaknesses : [String] ,
        missingSkills : [String],
        suggestions : [String],
    },
    aiScore :{
        type : Number , 
        default : null
    }
} ,

{
    timestamps : true
}
)

export default mongoose.model("Application" , applicationSchema)