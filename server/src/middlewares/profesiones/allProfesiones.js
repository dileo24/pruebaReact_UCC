const { Profesion, Usuario } = require("../../db");

const allProfesiones = async (req, res, next) => {
  try {
    req.body.allRols = await Profesion.findAll({
      include: Usuario,
      order: [["id", "ASC"]],
    });
    next();
  } catch (err) {
    console.log("error en allProfesiones");
    res.status(404);
  }
};

module.exports = allProfesiones;
