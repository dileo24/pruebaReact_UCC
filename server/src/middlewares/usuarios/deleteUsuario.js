const { Usuario } = require("../../db");

const deleteUsuario = async (req, res, next) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findOne({ where: { id } });
    if (!usuario) {
      throw new Error(`No existe el Usuario con el ID: ${id}`);
    }
    await Usuario.destroy({ where: { id: usuario.id } });
    req.body.eliminado = {
      status: 200,
      resultado: `El usuario: ${usuario.nombre}, con ID: ${usuario.id} ha sido eliminado`,
    };
    next();
  } catch (err) {
    console.log("error en deleteUsuario");
    console.log(err);
    req.body.eliminado = { status: 404, resultado: err.message };
    next();
  }
};

module.exports = deleteUsuario;
