const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt")

const syncTable = async() => {
    try {
        await sequelize.sync({ force: false }).then(() => {
            console.log("> Music table created successfully");
        });
    } catch (err) {
        console.log("> [ERROR] Unable to create Music table: ", err);
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