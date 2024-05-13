class ProductDAO {
    constructor() {
    }
  
    async getAllProducts() {
      try {
        const products = await ProductModel.find();
        return products;
      } catch (error) {
        console.error('Error al obtener productos:', error);
        throw new Error('Error al obtener productos');
      }
    }

  }
  
  module.exports = ProductDAO;  