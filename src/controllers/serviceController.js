import ServiceModel from "../models/ServiceModel.js";

class ServiceController {
  async getAllServices(req, res) {
    try {
      const services = await ServiceModel.findAll();
      res.json(services);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      res.status(500).json({ error: "Erro ao buscar serviços" });
    }
  }

  async getServiceById(req, res) {
    try {
      const { id } = req.params;
      const service = await ServiceModel.findById(id);
      if (!service) return res.status(404).json({ error: "Serviço não encontrado" });
      res.json(service);
    } catch (error) {
      console.error("Erro ao buscar serviço:", error);
      res.status(500).json({ error: "Erro ao buscar serviço" });
    }
  }

  async createService(req, res) {
    try {
      const { name, description, price, duration } = req.body;
      if (!name || !description || !price || !duration) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }
      const newService = await ServiceModel.create(name, description, price, duration);
      res.status(201).json(newService);
    } catch (error) {
      console.error("Erro ao criar serviço:", error);
      res.status(500).json({ error: "Erro ao criar serviço" });
    }
  }

  async updateService(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, duration } = req.body;
      const updatedService = await ServiceModel.update(id, name, description, price, duration);
      if (!updatedService) return res.status(404).json({ error: "Serviço não encontrado" });
      res.json(updatedService);
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error);
      res.status(500).json({ error: "Erro ao atualizar serviço" });
    }
  }

  async deleteService(req, res) {
    try {
      const { id } = req.params;
      const result = await ServiceModel.delete(id);
      if (!result) return res.status(404).json({ error: "Serviço não encontrado" });
      res.status(204).end();
    } catch (error) {
      console.error("Erro ao remover serviço:", error);
      res.status(500).json({ error: "Erro ao remover serviço" });
    }
  }
}

export default new ServiceController();
