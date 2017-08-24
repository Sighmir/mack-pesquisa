use controladoria;

CREATE TABLE `dados_usuario` (
  `id_dados_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_objetivo` int(11) NOT NULL,
  `id_indicador` int(11) NOT NULL,
  `id_ferramenta` int(11) NOT NULL,
  `tipo_empresa` varchar(100) NOT NULL,
  `qtde_funcionarios` varchar(50) NOT NULL,
  `setor` varchar(100) NOT NULL,
  `setor_usuario` varchar(100) NOT NULL,
  `nivel_usuario` varchar(100) NOT NULL,
  PRIMARY KEY (`id_dados_usuario`),
  KEY `fk_usuario` (`id_usuario`),
  KEY `fk_objetivo` (`id_objetivo`),
  KEY `fk_indicador` (`id_indicador`),
  CONSTRAINT `fk_indicador` FOREIGN KEY (`id_indicador`) REFERENCES `indicador` (`id_indicador`),
  CONSTRAINT `fk_objetivo` FOREIGN KEY (`id_objetivo`) REFERENCES `objetivo` (`id_objetivo`),
  CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  CONSTRAINT `fk_ferramenta` FOREIGN KEY (`id_ferramenta`) REFERENCES `ferramenta` (`id_ferramenta`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


