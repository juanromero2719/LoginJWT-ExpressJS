const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');


router.post('/register', (req, res) => {
    // #swagger.tags = ['Authentication']
    authController.register(req, res);
});

router.post('/login', (req, res) => {
    // #swagger.tags = ['Authentication']
    authController.login(req, res);
});

router.post('/logout', (req, res) => {
    // #swagger.tags = ['Authentication']
    authController.logout(req, res);
});

module.exports = router;
