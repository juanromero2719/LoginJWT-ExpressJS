const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/getUsers', (req, res) => {
    // #swagger.tags = ['Usuarios']
    userController.getUsers(req, res);
});


module.exports = router;
