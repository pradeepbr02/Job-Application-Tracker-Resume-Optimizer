import express from 'express'
import cors from 'cors'
import authRoutes from './src/routes/auth.routes.js'
import cookieParser from "cookie-parser"
import userRoutes from './src/routes/user.routes.js'
import resumeRoutes from './src/routes/resume.routes.js'
import applicationRoutes from './src/routes/application.routes.js'
import aiRoutes from './src/routes/ai.routes.js'
import analyticsRoute from './src/routes/analytics.routes.js'

const app = express()
const allowedOrigins = [
  "http://localhost:3000",
  "https://job-application-tracker-resume-optimizer-if68k3elg.vercel.app/"
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json())
app.use(cookieParser())


app.get('/health' , (req , res)=>{
    res.status(200).json({status : 'OK'})
})

app.use('/api/v1' , authRoutes)
app.use('/api/v1' , userRoutes)
app.use('/api/v1' , resumeRoutes)
app.use('/api/v1' , applicationRoutes )
app.use('/api/v1' , aiRoutes)
app.use('/api/v1' , analyticsRoute)
export default app