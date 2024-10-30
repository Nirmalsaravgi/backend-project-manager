const JWT = require("jsonwebtoken");

const secret = '$ultr@$ecre!';

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    };
    const token = JWT.sign(payload, secret);
    return token;
};

function validateToken(token) {
    const payload = JWT.verify(token, secret);
    return payload;
};

function decodeToken(token) {
    try {
        return JWT.verify(token, secret);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = {
    createTokenForUser,
    validateToken,
    decodeToken
};