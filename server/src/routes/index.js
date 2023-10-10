const express = require("express");

const Usuarios = require("./usuarios");
const Profesiones = require("./profesiones");
const router = express();
router.use(express.json());

router.use("/usuarios", Usuarios);
router.use("/profesiones", Profesiones);
router.all("*", (req, res) => {
  res.redirect("/");
});

module.exports = router;
