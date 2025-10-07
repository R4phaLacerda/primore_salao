import prisma from "../prisma/prisma.js";

class ClientModel {
  async findAll() {
    return await prisma.client.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id) {
    return await prisma.client.findUnique({ where: { id: Number(id) } });
  }

  async create(name, email, phone, password) {
    return await prisma.client.create({
      data: { name, email, phone, password },
    });
  }

  async update(id, name, email, phone, password) {
    const client = await this.findById(id);
    if (!client) return null;

    const data = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (phone !== undefined) data.phone = phone;
    if (password !== undefined) data.password = password;

    return await prisma.client.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    const client = await this.findById(id);
    if (!client) return null;
    await prisma.client.delete({ where: { id: Number(id) } });
    return true;
  }
}

export default new ClientModel();
