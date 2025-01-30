const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt")

const syncTable = async() => {
    try {
        await sequelize.sync({ force: false }).then(() => {
            console.log("> Tabela Music criada com sucesso");
        });
    } catch (err) {
        console.log("> [ERRO] Não foi possível criar a tabela Music: ", err);
    };
};

const Music = sequelize.define("music", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    youtube_link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lyrics: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

syncTable();
module.exports = Music;