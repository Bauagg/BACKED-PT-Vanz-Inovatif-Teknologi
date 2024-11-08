const router = require('express').Router()
const authorization = require('../middlewares/autorization')
const { listFruit, detailFruit, createFruit, updateFruit, deleteFruit } = require('../controllers/fruit')

router.get('/api/fruit', authorization, listFruit)
router.get('/api/fruit/:id', detailFruit)
router.post('/api/fruit', authorization, createFruit)
router.put('/api/fruit/:id', authorization, updateFruit)
router.delete('/api/fruit/:id', authorization, deleteFruit)

module.exports = router