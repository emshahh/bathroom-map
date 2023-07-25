
import express from 'express'
import { getAllToilets, getToiletByBorough } from '../controller/dataController.js'


const router = express.Router()

router.get('/', getAllToilets)
router.get('/borough', getToiletByBorough)

export default router