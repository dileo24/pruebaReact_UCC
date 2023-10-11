const { Usuario, Profesion, Post } = require("../../db");

const findUsuario = async (req, res, next) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findByPk(id, {
      include: [
        {
          model: Profesion,
          attributes: ["id", "profesion"],
          through: {
            attributes: [],
          },
        },
        {
          model: Post,
          attributes: ["id", "titulo", "cuerpo"],
        },
      ],
    });

    req.body.findUsuario = {
      status: 200,
      resultado: usuario,
    };

    next();
  } catch (err) {
    console.log("error in findUsuario", err.message);
    req.body.findUsuario = { status: 500, resultado: err.message };
  }
};

module.exports = findUsuario;
