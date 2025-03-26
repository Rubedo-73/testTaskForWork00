import { Router } from 'express'
import balance from './routes/balance.js'
const router = Router()

// router.use()

// define the home page route
router.route('/updateBalance').patch(balance)

export default router