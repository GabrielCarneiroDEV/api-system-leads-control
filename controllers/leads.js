const knex = require("../databaseConnection");

const getLeads = async (req, res) => {
  const user = req.user;

  try {
    const leads = await knex("leads").where({ user_id: user.id });
    return res.status(200).json(leads);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const createLead = async (req, res) => {
  const user = req.user;
  const { name, phone, email, rpa, pd, bpm, analytics } = req.body;
  if (!name || !phone || !email) {
    return res
      .status(400)
      .json({ mensagem: "Os campos nome, email e telefone são obrigatórios" });
  }

  try {
    const newLead = await knex("leads").insert({
      name,
      phone,
      email,
      rpa,
      pd,
      bpm,
      analytics,
      user_id: user.id,
    });

    if (!newLead) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível criar o lead" });
    }

    return res.status(200).json({ mensagem: "Lead criado com sucesso!" });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const editLead = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { name, phone, email, rpa, pd, bpm, analytics } = req.body;

  if (!name || !phone || !email) {
    return res
      .status(400)
      .json({ mensagem: "Os campos nome, email e telefone são obrigatórios" });
  }

  try {
    const updateLead = await knex("leads").where({ id, user_id: user.id }).update({
      name,
      phone,
      email,
      rpa,
      pd,
      bpm,
      analytics,
      user_id: user.id,
    });

    if (!updateLead) {
      return res.status(400).json({ mensagem: "Lead não encontrado" });
    }

    return res
      .status(200)
      .json({ mensagem: "Atualização concluída com sucesso!" });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const deleteLead = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const deletedLead = await knex("leads").where({ id, user_id:user.id }).del();

    if (!deletedLead) {
      return res.status(404).json({ mensagem: "Lead não encontrado." });
    }
    return res.status(200).json({ mensagem: "lead excluído com sucesso!" });
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

const updatePosition = async (req, res) => {
  const { position } = req.body;
  const { id } = req.params;
  const user = req.user;

  try {
    const leadToUpdate = await knex("leads").where({ id, user_id: user.id }).update({position});
    if(!leadToUpdate){
      res.status(400).json({mensagem: "Não foi possível mover o lead"});
    }

    return res.status(200).json(leadToUpdate);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  getLeads,
  createLead,
  editLead,
  deleteLead,
  updatePosition,
};
