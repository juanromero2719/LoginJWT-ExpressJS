// Repositories
const productRepository = require('../repositories/productRepository');

class ProductService {

    async getProducts() {
        
        const products = await productRepository.findAll();
        return products;
        
    }

    async createProduct(product) {

        const { nombre, descripcion, precio } = product;
        const createdProduct = await productRepository.create({ nombre, descripcion, precio }); 
        return createdProduct;
        
    }

}

module.exports = new ProductService();
