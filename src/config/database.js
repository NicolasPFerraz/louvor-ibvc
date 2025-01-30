const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config()
const sequelize = new Sequelize(
    'louvor_ibvc',
    'root',
    process.env.DB_PASS,
    {
       host: '127.0.0.1',
       dialect: 'mariadb',
       logging: false
    }
);

const authenticate = async() => {
    try {
        await sequelize.authenticate().then(() => {
            console.log("> Conexão com o banco de dados feita com sucesso");
        });
    } catch (err) {
        console.log("> [ERRO] Não foi possível conectar ao banco de dados: ", err);
    }
}

authenticate();

module.exports = sequelize;