import ProductModel from "../models/ProductModel.js";

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await ProductModel.findAll();
      res.json(products);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);
      if (!product) return res.status(404).json({ error: "Produto não encontrado" });
      res.json(product);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      res.status(500).json({ error: "Erro ao buscar produto" });
    }
  }

  async createProduct(req, res) {
    try {
      const { name, description, price, stock } = req.body;
      if (!name || !description || !price || !stock) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }
      const newProduct = await ProductModel.create(name, description, price, stock);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, stock } = req.body;
      const updatedProduct = await ProductModel.update(id, name, description, price, stock);
      if (!updatedProduct) return res.status(404).json({ error: "Produto não encontrado" });
      res.json(updatedProduct);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await ProductModel.delete(id);
      if (!result) return res.status(404).json({ error: "Produto não encontrado" });
      res.status(204).end();
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      res.status(500).json({ error: "Erro ao remover produto" });
    }
  }
}

export default new ProductController();
