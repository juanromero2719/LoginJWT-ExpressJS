const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get('/getAll', (req, res) => {
    // #swagger.tags = ['Productos']
    productController.getProducts(req, res);
});

router.post('/create', roleMiddleware(['Administrador']), (req, res) => {
    // #swagger.tags = ['Productos']
    productController.createProduct(req, res);
});

module.exports = router;
