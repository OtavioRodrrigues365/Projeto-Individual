-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE zonaDayz;

USE zonaDayz;


CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(80) UNIQUE,
	senha VARCHAR(50)
);

SELECT * FROM usuario;


INSERT INTO usuario VALUES
(default,'Otavio','otavio@gmail.com','tata'),
(default,'Luis','luis@gmail.com','tata'),
(default,'Guilherme','guilherme@gmail.com','tata'),
(default,'Willian','willian@gmail.com','tata'),
(default,'Vivian','vivian@gmail.com','tata'),
(default,'Fernanda','fernanda@gmail.com','tata'),
(default,'Leticia','leticia@gmail.com','tata'),
(default,'Monteiro','monteiro@gmail.com','tata'),
(default,'JP','jp@gmail.com','tata'),
(default,'Kaori','kaori@gmail.com','tata'),
(default,'Eduarda','eduarda@gmail.com','tata');

CREATE TABLE quiz(
	idQuiz INT PRIMARY KEY AUTO_INCREMENT,
    dtTentativa DATE DEFAULT (CURRENT_DATE),
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    pontos INT,
    duracao TIME,
    armas INT,
    acessorios INT,
    animais INT
);



INSERT INTO quiz(pontos,duracao,fkUsuario) VALUES
(30, '00:02:22', 1),
(27, '00:05:21', 2),
(24, '00:08:21', 3),
(21, '00:18:21', 4),
(18, '00:02:21', 5),
(15, '00:09:21', 6),
(12, '00:18:21', 7),
(9, '00:12:21', 8),
(6, '00:33:21', 9),
(3, '00:10:21', 10);


SELECT * FROM quiz;

CREATE TABLE tutorial(
idTutorial INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100)
);

SELECT * FROM tutorial;


INSERT INTO tutorial(nome) VALUES
('Como começar do zero no mapa chernarus'),
('11 Dicas para iniciantes'),
('40+ Dicas para iniciantes'),
('Como fazer fogueira e cozinhar de todas as formas'),
('Pra que serve os remédios'),
('Como caçar animais e estratégias de caça'),
('Melhores lugares pra fazer base'),
('Como construir uma Base no DayZ 2025'),
('Rota muito boa de loot militar'),
('Como Guardar seus itens!');


CREATE TABLE acesso(
idAcesso INT AUTO_INCREMENT,
fkUsuario INT,
fkTutorial INT,
dtUltimoAcesso DATE DEFAULT(CURRENT_DATE),
progresso INT,
FOREIGN KEY(fkUsuario) REFERENCES usuario(idUsuario),
FOREIGN KEY(fkTutorial) REFERENCES tutorial(idTutorial),
PRIMARY KEY(idAcesso, fkUsuario, fkTutorial)
);

SELECT * FROM acesso;

SELECT progresso FROM acesso WHERE fkUsuario = 1;


SELECT u.nome, t.nome, a.dtUltimoAcesso FROM acesso AS a
JOIN usuario AS u ON u.idUsuario = a.fkUsuario
JOIN tutorial AS t ON t.idTutorial = a.fkTutorial;

-- select do ranking
CREATE VIEW vw_ranking_quiz AS
SELECT u.idUsuario, u.nome AS Nome, MAX(q.pontos) AS Pontos, MIN(q.duracao) AS Tempo
FROM usuario AS u
JOIN quiz AS q ON q.fkUsuario = u.idUsuario
GROUP BY u.idUsuario, u.nome
ORDER BY MAX(q.pontos) DESC, MIN(q.duracao)
LIMIT 10;


SELECT * FROM vw_ranking_quiz;

-- Melhor Tempo usuário, Quantidade de quiz realizados, Soma dos pontos de todos os Quiz
SELECT fkUsuario,MIN(duracao) AS MelhorTempo,dtTentativa,COUNT(idQuiz) AS QuantidadeQuiz,SUM(pontos) AS PontosTotal 
FROM quiz AS q
WHERE fkUsuario = 1 GROUP BY q.fkUsuario, q.dtTentativa;

SELECT q.fkUsuario,q.duracao AS MelhorTempo,q.dtTentativa,tempo.QuantidadeQuiz,tempo.PontosTotal
FROM quiz q
JOIN ( SELECT fkUsuario, COUNT(idQuiz) AS QuantidadeQuiz, SUM(pontos) AS PontosTotal
FROM quiz
WHERE fkUsuario = 1
) AS tempo ON tempo.fkUsuario = q.fkUsuario
WHERE q.fkUsuario = 1 AND q.duracao = ( SELECT MIN(duracao) 
FROM quiz
WHERE fkUsuario = 1 ) LIMIT 1;


-- dados graficos 1
SELECT fkUsuario, dtTentativa, pontos FROM quiz WHERE fkUsuario = 1 ORDER BY dtTentativa;

-- dados do gráficos 2
SELECT dtTentativa, duracao FROM quiz WHERE fkUsuario = 1;

-- dados do gráficos 3
SELECT armas,acessorios, animais FROM quiz WHERE fkUsuario = 1 ORDER BY idQuiz DESC LIMIT 1;

