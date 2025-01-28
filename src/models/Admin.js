const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const syncTable = async() => {
    try {
        await sequelize.sync({ force: false }).then(() => {
            console.log("> Admin table created successfully");
        });
    } catch (err) {
        console.log("> [ERROR] Unable to create Admin table: ", err);
    };
};

const Admin = sequelize.define("admin", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }},  {
        tableName: 'admin' 
});

syncTable();
module.exports = Admin;