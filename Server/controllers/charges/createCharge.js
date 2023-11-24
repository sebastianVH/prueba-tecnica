const conn = require('../../src/database')
const{ID_OP,API_KEY_OP} = process.env
const Openpay = require('openpay');


const createCharge = async (req,res) => {
    const {amount,description,id_client} = req.body
    const charge = {method:'store',amount,description}

    try {
        const openpay = new Openpay(ID_OP,API_KEY_OP);
        openpay.customers.charges.create(id_client,charge,(err,response) => {
            if (err) return res.status(500).json({message:'Error Creating Charge'})
            conn.query(`INSERT INTO cargos VALUES ('${response.id}','${charge.method}',${amount},'${description}','${response.creation_date}','${response.customer_id}')`,(err,results,fields) => {
                if (err) return res.status(500).json({message:'Error Executing Query'})
                return res.status(200).json(response)
            })
        })
    } catch (error) {
        return res.status(400).json(error)
    }   
}

module.exports = createCharge