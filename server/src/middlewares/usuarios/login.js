const { Usuario } = require("../../db");
const { compare } = require("../../helpers/handleCrypt");

const login = async (req, res, next) => {
  try {
    let { email, clave } = req.body;
    email = email.toLowerCase();

    if (typeof email === "string" && typeof clave === "string") {
      let user = await Usuario.findOne({
        where: { email: email },
      });
      if (!user) {
        return res.status(404).send({ error: "Usuario no encontrado" });
      }
      const checkClave = await compare(clave, user.clave);

      if (checkClave) {
        return res.send(user);
      } else {
        return res.status(404).send({ error: "Contraseña incorrecta!" });
      }
    } else {
      throw new Error("datos pasados por body son incorrectos");
    }
  } catch (err) {
    req.body.resultado = { status: "404", respuesta: err.message };
    next();
  }
};

module.exports = login;
