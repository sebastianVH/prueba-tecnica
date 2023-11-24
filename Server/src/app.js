const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const clientRoutes = require('../routes/clientRoutes')
const chargeRoutes = require('../routes/chargeRoutes')
const conn = require('./database')
require('dotenv').config()



const server = express()
const PORT = 8000

server.use(morgan('dev'))
server.use(cors())
server.use(express.json())
server.use('/client',clientRoutes)
server.use('/charges',chargeRoutes)



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


