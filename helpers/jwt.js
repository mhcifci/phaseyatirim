const dotenv = require('dotenv'); 
const jwt = require('jsonwebtoken');
dotenv.config();

function generateAccessToken(email) {
    return jwt.sign({email:email}, process.env.TOKEN_SECRET, { expiresIn: '10800s' });
}


module.exports = {
    generateAccessToken
};
  