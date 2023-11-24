const conn = require('../../src/database')
const{ID_OP,API_KEY_OP} = process.env
const Openpay = require('openpay');

const createClient = async (req,res) => {

    try {
        const openpay = new Openpay(ID_OP,API_KEY_OP);
        const {name, last_name,email,phone_number} = req.body
        const customer = {name,last_name,email,phone_number}
        openpay?.customers?.create(customer,(err,response) => {
            if (err) return res.status(400).json({message:'Error Creating Client'})
            conn.query(`INSERT INTO clientes VALUES ('${response.id}','${name}','${last_name}','${email}','${phone_number}')`,(err,results,fields) => {
                if (err) return res.status(400).json({message:'Error Executing Query'})
                return res.status(201).json(response)
            })
        })
    } catch (error) {
        return res.status(500).json(error)
    }   
}

module.exports = createClient