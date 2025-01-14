const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Role = require('./Role');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Establecer como único identificador
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id',
        },
    },
}, {
    tableName: 'users',
    timestamps: false,
});

// Relación entre usuarios y roles
User.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = User;
