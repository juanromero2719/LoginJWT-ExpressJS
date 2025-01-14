const Role = require('../models/Role');

class RoleRepository {
    async findRoleByName(name) {
        return await Role.findOne({ where: { name } });
    }
}

module.exports = new RoleRepository();
