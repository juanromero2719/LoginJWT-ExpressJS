// Utils
const jwt = require('jsonwebtoken');

const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_KEY,
            { expiresIn: '1h' }, 
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            }
        );
    });
};

module.exports = { createAccessToken };
