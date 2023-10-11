const { Profesion, Usuario } = require("../../db");

const allProfesiones = async (req, res, next) => {
  try {
    req.body.allProfesiones = await Profesion.findAll({
      include: Usuario,
      order: [["id", "ASC"]],
    });
    next();
  } catch (err) {
    console.log("error en allProfesiones", err.message);
    res.status(404);
  }
};

module.exports = allProfesiones;
