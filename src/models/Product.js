const { DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Tu archivo de configuración de Sequelize

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false, // Campo requerido
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true, // Campo opcional
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, // Campo requerido
        validate: {
            min: 0, // Validar que el precio sea mayor o igual a 0
        },
    },
}, {
    tableName: 'products', // Nombre de la tabla en la base de datos
    timestamps: false, // Si no deseas que Sequelize maneje createdAt y updatedAt
});

module.exports = Product;
