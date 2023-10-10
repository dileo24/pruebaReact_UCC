const profesiones = require("./json/profesiones.json");
const usuarios = require("./json/usuarios.json");
const { encrypt } = require("./helpers/handleCrypt");
const { Usuario, Profesion } = require("./db.js");

async function fnProfesiones() {
  for (const prof of profesiones) {
    await Profesion.create(prof);
  }
}

async function fnUsuarios() {
  for (const u of usuarios) {
    const user = await Usuario.create({
      nombre: u.nombre,
      apellido: u.apellido,
      email: u.email,
      domicilio: u.domicilio,
      clave: await encrypt(u.clave),
      bloqueo: u.bloqueo,
    });
    for (const profID of u.profesiones) {
      const profesion = await Profesion.findOne({
        where: { id: profID },
      });
      if (profesion) {
        await user.addProfesion(profesion);
      } else {
        console.log(`Profesión no encontrada: ${profID}`);
      }
    }
  }
}

module.exports = {
  fnProfesiones,
  fnUsuarios,
};
