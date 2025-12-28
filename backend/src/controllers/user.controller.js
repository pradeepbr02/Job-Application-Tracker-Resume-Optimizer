import User from "../models/users.models.js";

export const getProfile = async(req , res , next)=>{
    try{
        const user = await User.findById(req.user).select('-password')

        if(!user){
            return res.status(404).json({message : "User Not Found"})
        }

        return res.status(200).json({
            user
        })

    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Server Error"})
    }
}