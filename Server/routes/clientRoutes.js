const {Router} = require('express')
const createClient = require('../controllers/client/createClient')
const deleteClient = require('../controllers/client/deleteClient')
const updateClient = require('../controllers/client/updateClient')
const clientList = require('../controllers/client/clientsList')


const router = Router()

router.post('/createClient',createClient)
router.get('/clientsList',clientList)
router.put('/updateClient/:id',updateClient)
router.delete('/deleteClient/:id',deleteClient)

module.exports = router