const { Usuario } = require("../../db");

const findUsuario = async (req, res, next) => {
  try {
    const id = req.params.id;
    req.body.findUsuario = {
      status: 200,
      resultado: await Usuario.findByPk(id),
    };
    next();
  } catch (err) {
    req.body.findUsuario = { status: 404, resultado: err.message };
  }
};

module.exports = findUsuario;
