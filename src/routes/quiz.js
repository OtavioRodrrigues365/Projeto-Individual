var express = require("express");
var router = express.Router();


var quizController = require("../controllers/quizController");

router.post("/guardarQuiz", function (req, res) {
    quizController.guardarQuiz(req, res);
});

router.get("/ranking", function (req, res) {
    quizController.buscarRanking(req, res);
});

router.get("/indicadores/:idUsuario", function (req, res) {
    quizController.buscarIndicadores(req, res);
});

router.get("/tentativas/:idUsuario", function (req, res) {
    quizController.buscarTentativas(req, res);
});

router.get("/melhorTempo/:idUsuario", function (req, res) {
    quizController.buscarMelhorTempo(req, res);
});

router.get("/taxaCategoria/:idUsuario", function (req, res) {
    quizController.buscarCategorias(req, res);
});
module.exports = router;