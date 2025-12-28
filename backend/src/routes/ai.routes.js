import express from 'express'
import { analyzeLatestResume } from '../controllers/ai.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/analyze/resume/:id' , protect , analyzeLatestResume)

export default router