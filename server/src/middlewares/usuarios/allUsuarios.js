const { Post, Usuario, Profesion } = require("../../db");

const allUsuarios = async (req, res, next) => {
  try {
    const allUsuarios = await Usuario.findAll({
      include: [
        {
          model: Profesion,
          attributes: ["id", "profesion"],
          through: {
            attributes: [], // excluir tabla intermedia
          },
        },
        {
          model: Post,
          attributes: ["id", "titulo", "cuerpo"],
        },
      ],
    });
    req.body.allUsuarios = { status: 200, resultado: allUsuarios };
    next();
  } catch (err) {
    console.log("error en allUsuarios", err.message);
    req.body.allUsuarios = { status: 404, resultado: err.message };
  }
};

module.exports = allUsuarios;
