const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const appRoutes = require('./routes/appRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./database/database');

const server = () => {
    const app = express();
    const PORT = process.env.PORT || 3000;
    const URL = process.env.DEPLOY_URL || 'localhost';
    const allowedOrigins = [
        `http://${URL}`,
        `https://${URL}`,
        `http://localhost:3000`,
        `http://localhost:3001`,
        `http://localhost:3002`,
    ];

    app.use(express.json());
    app.use(cookieParser());

    app.use(cors({
        origin: (origin, callback) => {
            console.log(`Origin recibido: ${origin}`);
            // Permitir solicitudes desde orígenes permitidos o sin origen (para file://)
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            callback(new Error('No permitido por CORS'));
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    }));

    // Middleware para registrar IP y endpoint
    app.use((req, res, next) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Obtener la IP del cliente
        const endpoint = req.originalUrl; // Obtener el endpoint solicitado
        const method = req.method; // Obtener el método HTTP
        const date = new Date().toISOString(); // Obtener la fecha y hora en formato ISO

        console.log(`[${date}] IP: ${ip} - Method: ${method} - Endpoint: ${endpoint}`);
        next();
    });

    // Rutas de la API
    app.use('/', appRoutes);

    // Documentación Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Verificar la conexión con PostgreSQL
    sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a PostgreSQL con Sequelize');
    })
    .catch(err => {
        console.error('Error conectando a PostgreSQL con Sequelize:', err);
    });

    // Encabezados de seguridad
    app.use((req, res, next) => {
        res.setHeader('Content-Security-Policy', "script-src 'self'");
        next();
    });

    // Arrancar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://${URL}:${PORT}`);
        console.log(`Documentación disponible en http://${URL}:${PORT}/api-docs`);
    });
};

module.exports = server;
