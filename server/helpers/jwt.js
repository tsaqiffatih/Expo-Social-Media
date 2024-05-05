require('dotenv').config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY

const createToken = (payload) => {
  let token = jwt.sign(payload, secret);
  return token;
};

const verifyToken = (token) => {
  let verify = jwt.verify(token, secret);
  return verify;
};

module.exports = { createToken, verifyToken };