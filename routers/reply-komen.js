const router = require('express').Router()
const authorization = require('../middlewares/autorization')
const { listReplyComentar, createReplyComentar } = require('../controllers/reply-komen')
const { createComentar } = require('../controllers/komentar')

router.get('/api/reply-komentar/:id', listReplyComentar)
router.post('/api/reply-komentar', authorization, createReplyComentar)

router.post('/api/komentar', authorization, createComentar)

module.exports = router