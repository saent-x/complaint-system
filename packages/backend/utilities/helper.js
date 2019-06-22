const exjwt = require('express-jwt');

const JWT_SECRET = "e4dd99ae701";
const jwtMiddleware = exjwt({
    secret: JWT_SECRET
});

function GetTokenDetails(token) {
    return null;
}

module.exports = {
    JWT_SECRET, jwtMiddleware, GetTokenDetails
};