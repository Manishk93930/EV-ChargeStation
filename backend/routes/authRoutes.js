const express = require('express')
const router = express.Router()
const { signup, login, register } = require('../controllers/authController')

router.post('/signup', signup)
router.post('/login', login)
router.post('/register',register)

module.exports = router
