import prisma from "../prisma/prisma.js";

class AppointmentModel {
  async findAll() {
    return await prisma.appointment.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id) {
    return await prisma.appointment.findUnique({ where: { id: Number(id) } });
  }

  async create(clientId, professionalId, serviceId, date) {
    return await prisma.appointment.create({
      data: { clientId, professionalId, serviceId, date: new Date(date) },
    });
  }

  async update(id, clientId, professionalId, serviceId, date) {
    const appointment = await this.findById(id);
    if (!appointment) return null;

    const data = {};
    if (clientId !== undefined) data.clientId = clientId;
    if (professionalId !== undefined) data.professionalId = professionalId;
    if (serviceId !== undefined) data.serviceId = serviceId;
    if (date !== undefined) data.date = new Date(date);

    return await prisma.appointment.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    const appointment = await this.findById(id);
    if (!appointment) return null;
    await prisma.appointment.delete({ where: { id: Number(id) } });
    return true;
  }
}

export default new AppointmentModel();
