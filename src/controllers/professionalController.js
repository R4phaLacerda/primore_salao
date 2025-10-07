import ProfessionalModel from "../models/ProfessionalModel.js";

class ProfessionalController {
  async getAllProfessionals(req, res) {
    try {
      const pros = await ProfessionalModel.findAll();
      res.json(pros);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
      res.status(500).json({ error: "Erro ao buscar profissionais" });
    }
  }

  async getProfessionalById(req, res) {
    try {
      const { id } = req.params;
      const prof = await ProfessionalModel.findById(id);
      if (!prof) return res.status(404).json({ error: "Profissional não encontrado" });
      res.json(prof);
    } catch (error) {
      console.error("Erro ao buscar profissional:", error);
      res.status(500).json({ error: "Erro ao buscar profissional" });
    }
  }

  async createProfessional(req, res) {
    try {
      const { name, instagram } = req.body;
      if (!name || !instagram) return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      const newProf = await ProfessionalModel.create(name, instagram);
      res.status(201).json(newProf);
    } catch (error) {
      console.error("Erro ao criar profissional:", error);
      res.status(500).json({ error: "Erro ao criar profissional" });
    }
  }

  async updateProfessional(req, res) {
    try {
      const { id } = req.params;
      const { name, instagram } = req.body;
      const updatedProf = await ProfessionalModel.update(id, name, instagram);
      if (!updatedProf) return res.status(404).json({ error: "Profissional não encontrado" });
      res.json(updatedProf);
    } catch (error) {
      console.error("Erro ao atualizar profissional:", error);
      res.status(500).json({ error: "Erro ao atualizar profissional" });
    }
  }

  async deleteProfessional(req, res) {
    try {
      const { id } = req.params;
      const result = await ProfessionalModel.delete(id);
      if (!result) return res.status(404).json({ error: "Profissional não encontrado" });
      res.status(204).end();
    } catch (error) {
      console.error("Erro ao remover profissional:", error);
      res.status(500).json({ error: "Erro ao remover profissional" });
    }
  }
}

export default new ProfessionalController();
