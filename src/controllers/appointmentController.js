import AppointmentModel from "../models/AppointmentModel.js";

class AppointmentController {
  async getAllAppointments(req, res) {
    try {
      const appointments = await AppointmentModel.findAll();
      res.json(appointments);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      res.status(500).json({ error: "Erro ao buscar agendamentos" });
    }
  }

  async getAppointmentById(req, res) {
    try {
      const { id } = req.params;
      const appointment = await AppointmentModel.findById(id);
      if (!appointment) return res.status(404).json({ error: "Agendamento não encontrado" });
      res.json(appointment);
    } catch (error) {
      console.error("Erro ao buscar agendamento:", error);
      res.status(500).json({ error: "Erro ao buscar agendamento" });
    }
  }

  async createAppointment(req, res) {
    try {
      const { clientId, professionalId, serviceId, date, time } = req.body;
      if (!clientId || !professionalId || !serviceId || !date || !time) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }
      const newAppointment = await AppointmentModel.create(clientId, professionalId, serviceId, date, time);
      res.status(201).json(newAppointment);
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      res.status(500).json({ error: "Erro ao criar agendamento" });
    }
  }

  async updateAppointment(req, res) {
    try {
      const { id } = req.params;
      const { clientId, professionalId, serviceId, date, time } = req.body;
      const updatedAppointment = await AppointmentModel.update(id, clientId, professionalId, serviceId, date, time);
      if (!updatedAppointment) return res.status(404).json({ error: "Agendamento não encontrado" });
      res.json(updatedAppointment);
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
      res.status(500).json({ error: "Erro ao atualizar agendamento" });
    }
  }

  async deleteAppointment(req, res) {
    try {
      const { id } = req.params;
      const result = await AppointmentModel.delete(id);
      if (!result) return res.status(404).json({ error: "Agendamento não encontrado" });
      res.status(204).end();
    } catch (error) {
      console.error("Erro ao remover agendamento:", error);
      res.status(500).json({ error: "Erro ao remover agendamento" });
    }
  }
}

export default new AppointmentController();
