import express from 'express'
import { createApplication 
    ,getApplications 
    ,updateJobApplicationStatus
    ,updateApplicationNotes 
    ,deleteApplication
    ,getApplicationNotes} from "../controllers/application.controller.js";

import { protect } from '../middleware/auth.middleware.js';

const router  = express.Router()

router.post('/create/application' ,protect,  createApplication) 

router.get('/get/applications' ,protect, getApplications)

router.put('/update/application/:id/status' ,protect, updateJobApplicationStatus)

router.put('/update/application/:id/notes' ,protect, updateApplicationNotes)

router.delete('/delete/application/:id' , protect , deleteApplication)

router.get('/get/:appId/application/notes' , protect ,getApplicationNotes )

export default router
