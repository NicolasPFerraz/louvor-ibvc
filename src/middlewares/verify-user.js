const jwt = require('jsonwebtoken');
require("dotenv").config();

const secretKey = process.env.SECRET_KEY || "secret_key";

module.exports = (req, res, next) => {
	
	const singedCookie = req.signedCookies["adminToken"]
	req.headers['authorization'] = singedCookie;
	console.log(singedCookie)

	if (req.headers['authorization'] === undefined) {
		return res.status(403).send("Acesso não autorizado");
	}  
	const token = req.headers['authorization'].split(" ");

	if (!token) {
		return res.status(403).json({ message: 'Token is not provided' });
	}

	return jwt.verify(token[1], secretKey, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		console.log('user =>', decoded)
		req.user = decoded;
		next();
	});
}