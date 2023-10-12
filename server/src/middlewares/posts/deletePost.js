const { Post } = require("../../db");

const deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      throw new Error(`No existe el post con el ID: ${id}`);
    }
    await Post.destroy({ where: { id: post.id } });
    req.body.eliminado = {
      status: 200,
      resultado: `El post: ${post.titulo}, con ID: ${post.id} ha sido eliminado`,
    };
    next();
  } catch (err) {
    console.log("error en deletePost", err.message);
    req.body.eliminado = { status: 404, resultado: err.message };
    next();
  }
};

module.exports = deletePost;
