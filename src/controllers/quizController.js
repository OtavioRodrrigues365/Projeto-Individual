var quizModel = require("../models/quizModel");


function guardarQuiz(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var pontos = req.body.pontosServer;
    var duracao = req.body.duracaoServer;
    var fkUsuario = req.body.fkUsuarioServer;
    var armas = req.body.armasServer;
    var animais = req.body.animaisServer;
    var acessorios = req.body.acessoriosServer;

    // Faça as validações dos valores
    if (pontos == undefined) {
        res.status(400).send("Seus pontos estão undefined!");
    } else if (duracao == undefined) {
        res.status(400).send("Seu tempo está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("Sua fkUsuario está undefined!");
    } else if (armas == undefined) {
        res.status(400).send("Sua pontuação de armas está undefined!");
    } else if (animais == undefined) {
        res.status(400).send("Sua pontuação de animais está undefined!");
    } else if (acessorios == undefined) {
        res.status(400).send("Sua pontuação de acessórios está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo quizModel.js
        quizModel.guardarQuiz(pontos, duracao, fkUsuario, armas, animais, acessorios)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o armazenamento das informações! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarRanking(req, res) {
    console.log(`Recuperando dados do ranking`);

    quizModel.buscarRanking().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos nomes do Quiz.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarIndicadores(req, res) {

    var idUsuario = req.params.idUsuario;
    console.log(`Buscando o melhor tempo, quantidade quiz realizados e pontos acumulados`);

    quizModel.buscarIndicadores(idUsuario).then(function (resultado) {
        if (resultado.length == 1) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados dos indicadores.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarTentativas(req, res) {

    var idUsuario = req.params.idUsuario;
    console.log(`Buscando o histórico de tentativas`);

    quizModel.buscarTentativas(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar tentativas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMelhorTempo(req, res) {
    var idUsuario = req.params.idUsuario;
    console.log(`Buscando o histórico de melhor tempo`);

    quizModel.buscarMelhorTempo(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar melhor tempo.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarCategorias(req, res) {
    var idUsuario = req.params.idUsuario;
    console.log(`Buscando o categorias e taxa de acerto`);

    quizModel.buscarCategorias(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar categorias.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    guardarQuiz,
    buscarRanking,
    buscarIndicadores,
    buscarTentativas,
    buscarMelhorTempo,
    buscarCategorias
}