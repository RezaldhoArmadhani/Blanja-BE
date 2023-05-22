const express = require('express')
const router = express.Router()
const {register,login, refreshToken,profile} = require('../controllers/userr.controller')
const {protect} = require('../middleware/auth')


router.post('/register',register)
router.post('/login',login)
router.post('/refresh-token',refreshToken)
router.get('/profile',protect,profile)


module.exports = router