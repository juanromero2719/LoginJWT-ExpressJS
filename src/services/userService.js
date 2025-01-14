// Repositories
const userRepository = require('../repositories/UserRepository');

class AuthService {

    async getUsers() {
        
        const users = await userRepository.getUsers();
        return users;
        
    }

}

module.exports = new AuthService();
