import express from "express"

import socialLogins from '../middlewares/socialLogins'
const router = express.Router();

router.post('/auth/:provider',socialLogins.tokeExchangeMiddleware)


export default router;