const User = require('../models/User');
const Role = require('../models/Role');

class UserRepository {

    async findByEmail(email) {
        return await User.findOne({ where: { email },
        include: [{ model: Role, attributes: ['name'] }],
        });
    }

    async create(userData) {
        return await User.create(userData); 
    }

    async getUsers() {
        return await User.findAll();
    }
}

module.exports = new UserRepository();
