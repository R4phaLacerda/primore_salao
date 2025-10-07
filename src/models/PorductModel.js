import prisma from "../prisma/prisma.js";

class ProductModel {
  async findAll() {
    return await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id) {
    return await prisma.product.findUnique({ where: { id: Number(id) } });
  }

  async create(name, description, price) {
    return await prisma.product.create({ data: { name, description, price } });
  }

  async update(id, name, description, price) {
    const product = await this.findById(id);
    if (!product) return null;

    const data = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (price !== undefined) data.price = price;

    return await prisma.product.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    const product = await this.findById(id);
    if (!product) return null;
    await prisma.product.delete({ where: { id: Number(id) } });
    return true;
  }
}

export default new ProductModel();
