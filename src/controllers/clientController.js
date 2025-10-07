import ClientModel from "../models/ClientModel.js";

class ClientController {
  async getAllClients(req, res) {
    try {
      const clients = await ClientModel.findAll();
      res.json(clients);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      res.status(500).json({ error: "Erro ao buscar clientes" });
    }
  }

  async getClientById(req, res) {
    try {
      const { id } = req.params;
      const client = await ClientModel.findById(id);
      if (!client) return res.status(404).json({ error: "Cliente não encontrado" });
      res.json(client);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      res.status(500).json({ error: "Erro ao buscar cliente" });
    }
  }

  async createClient(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }
      const newClient = await ClientModel.create(name, email, phone, password);
      res.status(201).json(newClient);
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      res.status(500).json({ error: "Erro ao criar cliente" });
    }
  }

  async updateClient(req, res) {
    try {
      const { id } = req.params;
      const { name, email, phone, password } = req.body;
      const updatedClient = await ClientModel.update(id, name, email, phone, password);
      if (!updatedClient) return res.status(404).json({ error: "Cliente não encontrado" });
      res.json(updatedClient);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      res.status(500).json({ error: "Erro ao atualizar cliente" });
    }
  }

  async deleteClient(req, res) {
    try {
      const { id } = req.params;
      const result = await ClientModel.delete(id);
      if (!result) return res.status(404).json({ error: "Cliente não encontrado" });
      res.status(204).end();
    } catch (error) {
      console.error("Erro ao remover cliente:", error);
      res.status(500).json({ error: "Erro ao remover cliente" });
    }
  }
}

export default new ClientController();
