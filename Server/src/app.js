const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const clientRoutes = require('../routes/clientRoutes')
const chargeRoutes = require('../routes/chargeRoutes')
const conn = require('./database')
const Openpay = require('openpay');
require('dotenv').config()

const{ID_OP,API_KEY_OP} = process.env


const server = express()
const PORT = 8000

server.use(morgan('dev'))
server.use(cors())
server.use(express.json())
server.use('/client',clientRoutes)
server.use('/charges',chargeRoutes)

const openpay = new Openpay(ID_OP,API_KEY_OP);

conn.connect((err) => {
    if (err) {
      console.error('Error de conexión a MySQL:', err);
    } else {
      console.log('Conexión a MySQL exitosa');
      server.listen(PORT,() => {
          console.log(`Corriendo en el puerto ${PORT}`);
      })
    }
  });

module.exports = openpay
