import express from 'express'
import { upload } from '../middleware/upload.middleware.js'
import { uploadResume , getResumes } from '../controllers/resume.controller.js'
import { protect } from '../middleware/auth.middleware.js'


const router = express.Router()

router.post('/upload/resume' , protect , upload.single('resume') , uploadResume)

router.get('/listresumes' , protect , getResumes)

export default router