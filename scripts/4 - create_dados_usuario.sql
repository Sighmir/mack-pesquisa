use controladoria;

CREATE TABLE `dados_usuario` (
  `id_dados_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `faturamento_empresa` varchar(100) NOT NULL,
  `regiao_empresa` varchar(100) NOT NULL,
  `segmento_empresa` varchar(100) NOT NULL,
  `conhecimento_ferramentas` varchar(100) NOT NULL,
  `grau_volatilidade` varchar(100) NOT NULL,
  `margem_contribuicao` varchar(50) NOT NULL,
  `percentual_equilibrio` varchar(50) NOT NULL,
  `margem_seguranca` varchar(50) NOT NULL,
  `diversificacao_clientes` varchar(100) NOT NULL,
  `data_acesso` date DEFAULT NULL,
  PRIMARY KEY (`id_dados_usuario`),
  CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


