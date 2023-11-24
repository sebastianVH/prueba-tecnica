const conn = require('../../src/database')



const clientList = async (req,res) => {
   
    try {
        conn.query(`select * from clientes`,(err,results,fields) => {
                if (err) return res.status(500).json({message:'Error Executing Query'})
                return res.status(200).json(results)
            })
    } catch (error) {
        return res.status(500).json(error)
    }   
}

module.exports = clientList