import User from "../models/users.models.js";
import {hashedPassword , comparePassword} from '../utils/password.js'
import { generateToken } from "../utils/token.js";

export const registerUser = async(req ,res)=>{
    try{
        const {name ,email , password} = req.body
        if(!name || !email || !password) {
            return res.status(400).json({message : "All fields are required"})
        }

        const exisitingUser = await User.findOne({email})
        if(exisitingUser){
            return res.status(409).json({message : "User already exists"})
        }

        const hashPassword = await hashedPassword(password)

        await User.create({
            name ,
            email, 
            password : hashPassword
        })

        return res.status(200).json({message : "User created successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Server error"})
    }
}

export const loginUser = async(req, res)=>{
    try{
        const {email , password} = req.body
        if(!email || !password) return res.status(400).json({message : "Email and password are required"})

        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({message : "Invalid credentials"})
        }

        const isMatch = await comparePassword(password , user.password)

        if(!isMatch){
            return res.status(401).json({message : "Invalid Credentials"})
        }

        const token = generateToken(user._id)
        
        // res.cookie('token', token, {
        // httpOnly: true,        // JS can't access it
        // // secure: process.env.NODE_ENV === 'production',
        // sameSite: 'strict',   // CSRF protection
        // maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        // })
        return res.status(200).json({
            message : "Login Successfull" , 
            token, 
            user :{
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    }

    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal service error"})
    }
}