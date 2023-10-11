const { Post, Usuario } = require("../../db");

const allPosts = async (req, res, next) => {
  try {
    const allPosts = await Post.findAll({
      include: [
        {
          model: Usuario,
          attributes: ["id", "email"], // atributos del usuario
        },
      ],
    });
    req.body.allPosts = { status: 200, resultado: allPosts };
    next();
  } catch (err) {
    console.log("error en allPosts", err.message);
    req.body.allPosts = { status: 404, resultado: err.message };
  }
};

module.exports = allPosts;
