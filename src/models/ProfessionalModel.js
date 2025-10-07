import prisma from "../prisma/prisma.js";

class ProfessionalModel {
  async findAll() {
    return await prisma.professional.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id) {
    return await prisma.professional.findUnique({ where: { id: Number(id) } });
  }

  async create(name, instagram) {
    return await prisma.professional.create({ data: { name, instagram } });
  }

  async update(id, name, instagram) {
    const prof = await this.findById(id);
    if (!prof) return null;

    const data = {};
    if (name !== undefined) data.name = name;
    if (instagram !== undefined) data.instagram = instagram;

    return await prisma.professional.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    const prof = await this.findById(id);
    if (!prof) return null;
    await prisma.professional.delete({ where: { id: Number(id) } });
    return true;
  }
}

export default new ProfessionalModel();
