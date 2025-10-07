import prisma from "../prisma/prisma.js";

class ServiceModel {
  async findAll() {
    return await prisma.service.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id) {
    return await prisma.service.findUnique({ where: { id: Number(id) } });
  }

  async create(name, description, price) {
    return await prisma.service.create({ data: { name, description, price } });
  }

  async update(id, name, description, price) {
    const service = await this.findById(id);
    if (!service) return null;

    const data = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (price !== undefined) data.price = price;

    return await prisma.service.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    const service = await this.findById(id);
    if (!service) return null;
    await prisma.service.delete({ where: { id: Number(id) } });
    return true;
  }
}

export default new ServiceModel();
