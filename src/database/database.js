﻿const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: console.log,
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
            useIPv6: false,
          },
    }
);

module.exports = sequelize;
