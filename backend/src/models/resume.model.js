import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' ,
        require : true
    },
    fileName :{
        type : String , 
        require : true ,
    },
    filePath :{
        type : String , 
        require : true
    },
    parsedText :{
        type : String, 
        require : true
    } ,
    
    version :{
        type : Number ,
        default : 1
    }
} ,
{
    timestamps: true
}
)

export default mongoose.model("Resume" , resumeSchema)