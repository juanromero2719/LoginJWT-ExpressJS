const productService = require('../services/productService');

class ProductController {

    async getProducts(req, res) {

        try {
            
            const products = await productService.getProducts();
            res.status(200).json(products);

        } catch (error) {
            
            res.status(400).json({ message: error.message });
        }
    }

    async createProduct(req, res) {
        
        try {

            const product = await productService.createProduct(req.body);
            res.status(201).json(product);

        } catch (error) {
            
            res.status(400).json({ message: error.message });
        }
    }
 
}

module.exports = new ProductController();
