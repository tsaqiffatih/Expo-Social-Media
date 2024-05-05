const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password);
  return hash;
};

const comparePassword = (password, passwordDB) => {
  const check = bcrypt.compareSync(password, passwordDB);
  return check;
};

module.exports = { hashPassword, comparePassword };