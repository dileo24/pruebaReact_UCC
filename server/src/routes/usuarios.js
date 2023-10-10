const { Router } = require("express");
const allUsuarios = require("../middlewares/usuarios/allUsuarios");
const login = require("../middlewares/usuarios/login");
const createUser = require("../middlewares/usuarios/createUsuario");
const updateUsuario = require("../middlewares/usuarios/updateUsuario");
const deleteUsuario = require("../middlewares/usuarios/deleteUsuario");
const findUsuario = require("../middlewares/usuarios/findUsuario");

const router = Router();

router.get("/", allUsuarios, async (req, res) => {
  return res.json(req.body.allUsuarios);
});
router.post("/login", login, async (req, res) => {
  return res.json(req.body.resultado);
});

router.post("/register", createUser, async (req, res) => {
  return res.status(200).send(req.body.resultado);
});

router.get("/:id", findUsuario, async (req, res) => {
  return res.json(req.body.findUsuario);
});

router.put("/:id", updateUsuario, async (req, res) => {
  return res.json(req.body.resultado);
});

router.delete("/:id", deleteUsuario, async (req, res) => {
  return res.json(req.body.eliminado);
});

module.exports = router;
