const jwt = require("jsonwebtoken");

const tokenSign = async (user) => {
  //genera el token
  return jwt.sign(
    {
      id: user.id,
      role: user.RolId,
    },
    process.env.JWT_SECRET
  );
};
const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET); //verifica que al token lo hayamos generado nosotros
  } catch (error) {
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
