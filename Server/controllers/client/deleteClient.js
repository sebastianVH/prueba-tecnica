const conn = require('../../src/database')
const{ID_OP,API_KEY_OP} = process.env
const Openpay = require('openpay');


const deleteClient = async (req,res) => {

    const openpay = new Openpay(ID_OP,API_KEY_OP);
    try {

        const id = req.params.id
        openpay?.customers?.delete(id,(err) => {
            if (err) return res.status(500).json({message:'Error Deleting Client'})
            conn.query(`DELETE FROM clientes where id = '${id}'`,(err,results,fields) => {
                if (err) return res.status(500).json({message:'Error Executing Query'})
                return res.status(200).json({message:'Client Deleted'})
            })
        })
    } catch (error) {
        return res.status(400).json(error)
    }   
}

module.exports = deleteClient