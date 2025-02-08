const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const secretKey = process.env.SECRET_KEY;

const generateToken = async (admin, password) => {
    const payload = {
        adminId: admin.id,
        adminName: admin.username
    }

    const options = {
        expiresIn: '1d' // Token expires in 24 hours
    };

    // Generate JWT token
    const token = jwt.sign(payload, secretKey, options);
    return token;
}

module.exports = async (username, password) => {
    try {
        // Buscar o administrador no banco
        const admin = await Admin.findOne({ where: { username: username } });

        if (!admin) {
            return { success: false, admin: false };
        }

        // Verificar se a senha é válida
        const isPassValid = await bcrypt.compare(password, admin.password);

        if (!isPassValid) {
            return { success: false, admin: false };
        }

        // Gerar o token de autenticação
        const token = await generateToken(admin, admin.password);

        console.log('> Novo usuário autenticado')
        return { success: true, admin: admin, token: token };

    } catch (error) {
        // Lidar com erros inesperados (ex: problemas no banco, hashing ou geração de token)
        console.error("> Erro ao autenticar usuário: " + error);
        return { success: false, error: "Erro interno no servidor" };  // Retorne uma mensagem genérica de erro
    }
}