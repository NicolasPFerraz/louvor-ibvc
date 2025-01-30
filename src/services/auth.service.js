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
    console.log(payload)
    const token = jwt.sign(payload, secretKey, options);
    return token;
}

module.exports = async (username, password) => {

    const admin = await Admin.findOne({ where: { username: username } });

    if (!admin) {
        return { success: false, admin: false }
    }

    const isPassValid = await bcrypt.compare(password, admin.password);

    if (!isPassValid) {
        return { success: false, admin: false }
    }
    const token = await generateToken(admin, admin.password);
    return { success: true, admin: admin, token: token }
}
