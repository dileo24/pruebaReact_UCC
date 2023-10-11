const { Router } = require("express");
const allPosts = require("../middlewares/posts/allPosts");
const createPost = require("../middlewares/posts/createPost");

const router = Router();

router.get("/", allPosts, async (req, res) => {
  return res.json(req.body.allPosts);
});
router.post("/", createPost, async (req, res) => {
  return res.json(req.body.resultado);
});

module.exports = router;
