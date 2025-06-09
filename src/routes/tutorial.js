var express = require("express");
var router = express.Router();

var tutorialController = require("../controllers/tutorialController");

//Recebendo os dados do html e direcionando para a função cadastrar de tutorialController.js
router.post("/cadastrarProgresso", function (req, res) {
    tutorialController.cadastrarProgresso(req, res);
})

router.get("/buscarProgresso/:idUsuario", function (req, res) {
    tutorialController.buscarProgresso(req, res);
})

module.exports = router;