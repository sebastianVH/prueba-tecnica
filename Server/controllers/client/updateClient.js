const conn = require('../../src/database')
const{ID_OP,API_KEY_OP} = process.env
const Openpay = require('openpay');


const updateClient = async (req,res) => {
    
    const id = req.params.id
    const {name, last_name,email,phone_number} = req.body

    try {
        const openpay = new Openpay(ID_OP,API_KEY_OP);
        const customer = {name,last_name,email,phone_number}
        openpay?.customers?.update(id,customer,(err,response) => {
        if (err) return res.status(400).json({message:'Error Updating Client'})
        conn.query(`UPDATE clientes SET name='${name}',last_name='${last_name}',email='${email}',phone_number='${phone_number}' WHERE id='${id}'`,(err,results,fields) => {
        if (err) return res.status(400).json({message:'Error Executing Query'})
        return res.status(204).json(response)
            })
        })
    } catch (error) {
        return res.status(500).json(error)
    }   
}

module.exports = updateClient