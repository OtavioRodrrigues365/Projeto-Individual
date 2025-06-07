var database = require("../database/config")

function cadastrarProgresso(fkUsuario, fkTutorial, progresso) {
    var instrucaoSql = `SELECT * FROM acesso WHERE fkUsuario = ${fkUsuario} AND fkTutorial = ${fkTutorial};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql).then(function(resposta){

        console.log(resposta[0].progresso);
        var instrucaoSql2 = ``;
        if(resposta.length > 0){
            if(resposta[0].progresso < progresso){
            instrucaoSql2 = `UPDATE acesso SET progresso = ${progresso} WHERE fkUsuario = ${fkUsuario} AND fkTutorial = ${fkTutorial};`;
            } 
        }else{
            instrucaoSql2 = `INSERT INTO acesso(fkUsuario,fkTutorial,progresso) VALUES
            (${fkUsuario}, ${fkTutorial}, ${progresso});`
        }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql2).catch(function (error) {
    console.error(`Erro na obtenção dos dados p/ progresso: ${error.message}`);
  });
    });
}


module.exports = {
    cadastrarProgresso,
};