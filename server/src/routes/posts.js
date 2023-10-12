const { Router } = require("express");
const allPosts = require("../middlewares/posts/allPosts");
const createPost = require("../middlewares/posts/createPost");
const deletePost = require("../middlewares/posts/deletePost");
const updatePost = require("../middlewares/posts/updatePost");

const router = Router();

router.get("/", allPosts, async (req, res) => {
  return res.json(req.body.allPosts);
});
router.post("/", createPost, async (req, res) => {
  return res.json(req.body.resultado);
});
router.put("/:id", updatePost, async (req, res) => {
  return res.json(req.body.resultado);
});
router.delete("/:id", deletePost, async (req, res) => {
  return res.json(req.body.eliminado);
});

module.exports = router;
