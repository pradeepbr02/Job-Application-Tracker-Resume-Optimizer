//entry point for the app
import app from "./app.js"; //express configuration
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 5000
const startServer = async()=>{
    try{
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI) 
        console.log("Connected to DB")
        
        app.listen(PORT , "0.0.0.0" , ()=>{
            console.log(`Server is running on port ${PORT}`)
        })
    }
    catch(err){
        console.log("Failed to connect to DB" , err.message)
        process.exit(1)
    }
    
}

startServer()

