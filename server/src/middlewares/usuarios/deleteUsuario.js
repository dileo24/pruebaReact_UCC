const { Usuario, Post } = require("../../db");
const { compare } = require("../../helpers/handleCrypt");

const deleteUsuario = async (req, res, next) => {
  try {
    let { claveAntigua } = req.body;
    const id = req.params.id;
    const usuario = await Usuario.findOne({ where: { id } });
    if (!usuario) {
      throw new Error(`No existe el Usuario con el ID: ${id}`);
    }
    const claveAntiguaValid = await compare(claveAntigua, usuario.clave);
    if (claveAntiguaValid) {
      await Post.destroy({ where: { UsuarioId: usuario.id } });
      await Usuario.destroy({ where: { id: usuario.id } });
      req.body.eliminado = {
        status: 200,
        resultado: `El usuario: ${usuario.nombre}, con ID: ${usuario.id} ha sido eliminado`,
      };
      next();
    } else {
      res.status(400).json({ error: "La clave antigua es incorrecta" });
    }
  } catch (err) {
    console.log("error en deleteUsuario", err.message);
    req.body.eliminado = { status: 404, resultado: err.message };
    next();
  }
};

module.exports = deleteUsuario;
