const exjwt = require("express-jwt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "e4dd99ae701";
const jwtMiddleware = exjwt({
	secret: JWT_SECRET
});

function GetTokenDetails(req) {
    const token = req.headers.authorization.split(" ")[1];
	return jwt.decode(token);
}

module.exports = {
	JWT_SECRET,
	jwtMiddleware,
	GetTokenDetails
};
