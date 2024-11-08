const router = require('express').Router()
const { register, login } = require('../controllers/auth-users')

router.post('/auth-user/register', register)
router.post('/auth-user/login', login)

module.exports = router