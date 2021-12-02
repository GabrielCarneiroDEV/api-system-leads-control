const knex = require("../databaseConnection")

const getLeads = async (req, res) => {
    const user = req.user
    //return res.json(user)
    try {
        const leads = await knex("leads").where({user_id:user.id});
        return res.json(leads)
        
    } catch (error) {
        return res.status(400).json({mensagem: error.message})
    }

}

const createLead = async (req, res)=>{

}

const editLead =  async (req,res) =>{

}

const deleteLead = async (req, res) => {

}

module.exports = {
    getLeads,
    createLead,
    editLead,
    deleteLead
}