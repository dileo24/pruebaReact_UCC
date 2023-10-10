const { Router } = require("express");
const allProfesiones = require("../middlewares/profesiones/allProfesiones");

const router = Router();

router.get("/", allProfesiones, async (req, res) => {
  return res.json(req.body.allProfesiones);
});

module.exports = router;
