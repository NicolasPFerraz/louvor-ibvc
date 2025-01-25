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
            console.log("> Database connection has been established successfully");
        });
    } catch (err) {
        console.log("> [ERROR] Unable to connect to the database: ", err);
    }
}

authenticate();

module.exports = sequelize;