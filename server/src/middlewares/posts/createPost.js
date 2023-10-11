const { Usuario, Post } = require("../../db");

const createPost = async (req, res, next) => {
  try {
    const { titulo, cuerpo, userId } = req.body;

    if (typeof titulo === "string" && typeof cuerpo === "string") {
      const usuario = await Usuario.findOne({
        where: { id: userId },
      });
      if (usuario) {
        const newPost = await Post.create({
          titulo,
          cuerpo,
        });
        await newPost.setUsuario(usuario);

        req.body.resultado = {
          titulo: newPost.titulo,
          cuerpo: newPost.cuerpo,
        };
      } else {
        throw new Error(`Usuario de id ${userId} no encontrado`);
      }
    } else {
      throw new Error("Título y cuerpo deben ser strings");
    }
  } catch (err) {
    req.body.resultado = { status: "404", respuesta: err.message };
  }

  next();
};

module.exports = createPost;
