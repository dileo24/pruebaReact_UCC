const { Post } = require("../../db");

const updatePost = async (req, res, next) => {
  try {
    let { titulo, cuerpo } = req.body;
    const id = req.params.id;
    const post = await Post.findByPk(id);
    if (post.lenght !== 0) {
      await Post.update(
        {
          titulo: titulo || post.titulo,
          cuerpo: cuerpo || post.cuerpo,
        },
        { where: { id: id } }
      );

      req.body.resultado = {
        status: "200",
        respuesta: "el post se ha actualizado exitosamente!!",
      };
      next();
    } else {
      throw new Error(`post con el ID: ${id} no se ha encontrado`);
    }
  } catch (err) {
    console.log("error en updatePost", err);
    req.body.resultado = { status: 404, resultado: err.message };
    next();
  }
};

module.exports = updatePost;
