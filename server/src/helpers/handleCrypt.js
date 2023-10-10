const bcrypt = require("bcryptjs");

const encrypt = async (clave) => {
  const claveHash = await bcrypt.hash(clave, 10);
  return claveHash;
};
const compare = async (clave, claveHash) => {
  return await bcrypt.compare(clave, claveHash);
};

module.exports = { encrypt, compare };
