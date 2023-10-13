const { Usuario, Profesion } = require("../../db");
const { compare, encrypt } = require("../../helpers/handleCrypt");

const updateUsuario = async (req, res, next) => {
  try {
    let {
      nombre,
      apellido,
      email,
      clave,
      domicilio,
      profesionesID,
      claveAntigua,
    } = req.body;
    const id = req.params.id;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      const claveAntiguaValid = await compare(claveAntigua, usuario.clave);
      if (claveAntiguaValid) {
        if (clave) {
          clave = await encrypt(clave);
        }

        await Usuario.update(
          {
            nombre: nombre || usuario.nombre,
            apellido: apellido || usuario.apellido,
            email: email || usuario.email,
            domicilio: domicilio || usuario.domicilio,
            clave: clave || usuario.clave,
          },
          { where: { id: id } }
        );

        if (profesionesID) {
          await usuario.removeProfesiones();
          for (const profID of profesionesID) {
            const profesion = await Profesion.findByPk(profID);
            if (profesion) {
              await usuario.addProfesion(profesion);
            }
          }
        }
        req.body.resultado = {
          status: "200",
          respuesta: "El Usuario se ha actualizado exitosamente!!",
        };
        next();
      } else {
        res.status(400).json({ error: "La clave antigua es incorrecta" });
      }
    } else {
      throw new Error(`Usuario con el ID: ${id} no se ha encontrado`);
    }
  } catch (err) {
    console.log("error en updateUsuario", err);
    req.body.resultado = { status: 404, resultado: err.message };
    next();
  }
};

module.exports = updateUsuario;
