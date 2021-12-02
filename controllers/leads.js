const knex = require("../databaseConnection")

const getLeads = async (req, res) => {
    const user = req.user

    try {
        const leads = await knex("leads").where({user_id:user.id});
        return res.status(200).json(leads);
        
    } catch (error) {
        return res.status(400).json({mensagem: error.message});
    }

}

const createLead = async (req, res)=>{
    const user = req.user;
    const {name, phone, email} = req.body
    if(!name || !phone || !email){
        return res.status(400).json({mensagem:"Os campos nome, email e telefone são obrigatórios"});
    }
    

    try {
        const newLead = await knex("leads").insert({name, phone, email, user_id: user.id})

        if(!newLead){
            return res.status(400).json({mensagem:"Não foi possível criar o lead"})
        };

        return res.status(200).json({mensagem: "Lead criado com sucesso!"})
        
    } catch (error) {
        return res.status(400).json({mensagem: error.message})
    }

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