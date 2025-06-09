var tutorialModel = require("../models/tutorialModel");


function cadastrarProgresso(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo tutorial.html
    var fkUsuario = req.body.fkUsuarioServer;
    var fkTutorial = req.body.fkTutorialServer;
    var progresso = req.body.progressoServer;

    // Faça as validações dos valores
    if (fkUsuario == undefined) {
        res.status(400).send("Sua fkUsuario está undefined!");
    } else if (fkTutorial == undefined) {
        res.status(400).send("Sua fkTutorial está undefined!");
    } else if (progresso == undefined) {
        res.status(400).send("Seu progresso está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo tutorialModel.js
        tutorialModel.cadastrarProgresso(fkUsuario, fkTutorial, progresso)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do progresso! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
};


function buscarProgresso(req, res) {
    var idUsuario = req.params.idUsuario;
    console.log(`Buscando o progresso de videos`);

    tutorialModel.buscarProgresso(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar progresso.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    cadastrarProgresso,
    buscarProgresso
}