-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE zonaDayz;

USE zonaDayz;


CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(80) UNIQUE,
	senha VARCHAR(50)
);

INSERT INTO usuario VALUES
(default,'luis','luis@gmail.com','tata'),
(default,'otavio','otavio@gmail.com','tata'),
(default,'eliude','eliude@gmail.com','tata123'),
(default,'gustavo','gustavo@gmail.com','tata123');

CREATE TABLE quiz(
	idQuiz INT PRIMARY KEY AUTO_INCREMENT,
    pontos INT,
    duracao TIME,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);


INSERT INTO quiz VALUES
(default, 30, '00:30:21', 1),
(default, 30, '00:31:21', 2),
(default, 30, '00:28:21', 3),
(default, 28, '00:28:21', 4);



-- ranking
CREATE VIEW vw_ranking_quiz AS
SELECT u.nome AS Nome, q.pontos AS 'Pontos do Quiz', q.duracao AS 'Tempo'
FROM usuario AS u 
JOIN quiz AS q ON q.fkUsuario = u.id ORDER BY q.pontos DESC, q.duracao ASC;


SELECT * FROM vw_ranking_quiz;