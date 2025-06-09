var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function guardarQuiz(pontos, duracao, fkUsuario, armas, animais, acessorios) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function guardarQuiz():", pontos, duracao, fkUsuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO quiz (pontos, duracao, fkUsuario, armas, animais, acessorios) VALUES ('${pontos}', '${duracao}', '${fkUsuario}', '${armas}', '${animais}', '${acessorios}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRanking() {
    var instrucaoSql = `SELECT * FROM vw_ranking_quiz;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarIndicadores(idUsuario) {
    var instrucaoSql = `SELECT q.fkUsuario,q.duracao AS MelhorTempo,q.dtTentativa,resumo.QuantidadeQuiz,resumo.PontosTotal FROM quiz q JOIN ( SELECT fkUsuario, COUNT(idQuiz) AS QuantidadeQuiz, SUM(pontos) AS PontosTotal FROM quiz WHERE fkUsuario = ${idUsuario} ) AS resumo ON resumo.fkUsuario = q.fkUsuario
    WHERE q.fkUsuario = ${idUsuario} AND q.duracao = ( SELECT MIN(duracao) 
    FROM quiz 
    WHERE fkUsuario = ${idUsuario} ) LIMIT 1;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTentativas(idUsuario) {
    var instrucaoSql = `SELECT dtTentativa, pontos FROM quiz WHERE fkUsuario = ${idUsuario} ORDER BY dtTentativa;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMelhorTempo(idUsuario) {
    var instrucaoSql = `SELECT dtTentativa, duracao FROM quiz WHERE fkUsuario = ${idUsuario};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarCategorias(idUsuario) {
    var instrucaoSql = `SELECT armas, acessorios, animais FROM quiz WHERE fkUsuario = ${idUsuario} ORDER BY idQuiz DESC LIMIT 1;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    guardarQuiz,
    buscarRanking,
    buscarIndicadores,
    buscarTentativas,
    buscarMelhorTempo,
    buscarCategorias
};