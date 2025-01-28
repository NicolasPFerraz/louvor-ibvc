const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
require("dotenv").config();

const hash = (password) => { return bcrypt.hash(password, 10) }

const createAdminUser = async () => {
	try {		

		let adminName = process.env.ADMIN_NAME
		let password = process.env.ADMIN_PASS


		if (!adminName || !password) {
			console.log("> Erro ao cadastrar administrador: campos inválidos")
			return {
				status: 400,
				success: false,
			}
		}

		password = await hash(password)

		const existingAdmin = await Admin.findOne({ where: { username: adminName }})

		if (existingAdmin) {
			console.log("> Erro ao cadastrar administrador: já existente")
			return {
				status: 400,
				success: false,
			}
		}

		await Admin.create({username: adminName, password: password});

		console.log("> Administrador criado com sucesso")
		return {
			status: 201,
			success: true,
		}


	} catch (error) {
		console.log(error)
    
		return {
			status: 500,
			success: false,
			message: "Erro interno",
			error: error
		}
	}
};

module.exports = {
    createAdminUser
};