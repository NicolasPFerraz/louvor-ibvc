const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const syncTable = async () => {
    try {
        await sequelize.sync({ force: false }).then(() => {
            console.log("> Tabela Admin criada com sucesso");
        });
    } catch (err) {
        console.log("> [ERRO] Não foi possível criar a tabela Admin: ", err);
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
    }
}, {
    tableName: 'admin'
});

syncTable();
module.exports = Admin;