const {Router} = require('express')
const createCharge = require('../controllers/charges/createCharge')

const router = Router()

router.post('/createCharge',createCharge)


module.exports = router