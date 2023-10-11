const { Usuario, Profesion } = require("../../db");
const { encrypt } = require("../../helpers/handleCrypt");

const createUsuario = async (req, res, next) => {
  try {
    let { nombre, apellido, email, clave, domicilio, profesiones } = req.body;

    const claveHash = await encrypt(clave);

    nombre = nombre[0].toUpperCase() + nombre.slice(1).toLowerCase();
    apellido = apellido[0].toUpperCase() + apellido.slice(1).toLowerCase();
    email = email.toLowerCase();

    if (
      typeof nombre === "string" &&
      typeof apellido === "string" &&
      typeof email === "string" &&
      typeof clave === "string" &&
      typeof domicilio === "string"
    ) {
      let newUsuario = await Usuario.findOne({
        where: { email },
      });
      if (newUsuario === null) {
        newUsuario = await Usuario.create({
          nombre,
          apellido,
          email,
          domicilio,
          clave: claveHash,
        });
      } else {
        throw new Error("Email ya registrado");
      }
      let profesionesArray = [];
      if (profesiones) {
        for (const profID of profesiones) {
          const profesion = await Profesion.findOne({
            where: { id: Number(profID) },
          });

          if (profesion) {
            await newUsuario.addProfesion(profesion);
            profesionesArray.push({
              id: profesion.id,
              nombre: profesion.profesion,
            });
          } else {
            throw new Error("No existe esa profesión! Id: ", profID);
          }
        }
      }

      req.body.resultado = {
        nombre: newUsuario.nombre,
        apellido: newUsuario.apellido,
        email: newUsuario.email,
        domicilio: newUsuario.domicilio,
        profesiones: profesionesArray,
      };
      next();
    } else {
      throw new Error("datos pasados por body incorrectos");
    }
  } catch (err) {
    req.body.resultado = { status: "404", respuesta: err.message };

    next();
  }
};

module.exports = createUsuario;
