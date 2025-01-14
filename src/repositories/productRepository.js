const Product = require('../models/Product');

class ProductRepository {
    // Obtener todos los productos
    async findAll() {
        return await Product.findAll();
    }

    // Obtener un producto por ID
    async findById(id) {
        return await Product.findByPk(id); // Usar findByPk para buscar por clave primaria
    }

    // Crear un nuevo producto
    async create(productData) {
        return await Product.create(productData); // Usar el método create de Sequelize
    }

    // Actualizar un producto existente
    async update(id, productData) {
        const product = await this.findById(id); // Buscar el producto primero
        if (!product) {
            throw new Error(`Producto con ID ${id} no encontrado`);
        }
        return await product.update(productData); // Actualizar el producto
    }

    // Eliminar un producto por ID
    async delete(id) {
        const product = await this.findById(id); // Buscar el producto primero
        if (!product) {
            throw new Error(`Producto con ID ${id} no encontrado`);
        }
        await product.destroy(); // Eliminar el producto
        return product;
    }
}

module.exports = new ProductRepository();
