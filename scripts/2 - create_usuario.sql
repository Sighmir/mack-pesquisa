use controladoria;

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `senha` varchar(250) DEFAULT NULL,
  `empresa` varchar(50) DEFAULT NULL,
  `perfil` varchar(50) DEFAULT NULL,
  `data_cadastro` date DEFAULT NULL,
  `ultimo_acesso` date DEFAULT NULL,
  PRIMARY KEY (`id`)
);

