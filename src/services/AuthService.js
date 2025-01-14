// Utils
const bcrypt = require('bcrypt');
const { createAccessToken } = require('../utils/jwt');

// Repositories
const userRepository = require('../repositories/UserRepository');
const roleRepository = require('../repositories/RoleRepository');

class AuthService {

    async register(userData) {

        const { firstname, lastname, email, password } = userData;

        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Este correo ya esta asociado a un usuario');
        }

        const roleData = await roleRepository.findRoleByName('Usuario');

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userRepository.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role_id: roleData.id,
        });

        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: roleData.name, 
        };
    }

    async login(email, password) {
        
        const user = await userRepository.findByEmail(email);

        console.log("rol del usuario: ", user?.Role?.name);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Credenciales inválidas');
        }

        const token = await createAccessToken({ id: user.id, role: user.Role.name });
        console.log("token del usuario logueado: ", token);
        return {
            token,
            userInfo: { id: user.id, name: user.name, email: user.email, role: user.Role.name },
        };
    }

}

module.exports = new AuthService();
