const {Router} = require('express')
const createCharge = require('../controllers/charges/createCharge')

const router = Router()

router.post('/newCharge',createCharge)


module.exports = router