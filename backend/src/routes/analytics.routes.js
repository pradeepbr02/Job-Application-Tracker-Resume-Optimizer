import { getDashboardAnalytics } from "../controllers/analytics.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import express from 'express'

const router = express.Router()

router.get('/analytics' , protect , getDashboardAnalytics)

export default router