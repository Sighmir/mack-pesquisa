use controladoria;

CREATE TABLE `dados_usuario` (
  `id_dados_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `concorrencia` varchar(100) NOT NULL,
  `qtde_funcionarios` varchar(50) NOT NULL,
  `incertezas_ambientais` varchar(100) NOT NULL,
  PRIMARY KEY (`id_dados_usuario`),
  CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


