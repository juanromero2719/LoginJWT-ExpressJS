const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/product', authMiddleware, productRoutes);
router.use('', authMiddleware, userRoutes);

module.exports = router;
