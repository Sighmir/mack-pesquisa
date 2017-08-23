CREATE TABLE `ferramenta` (
  `id_ferramenta` int(11) NOT NULL AUTO_INCREMENT,
  `balanced_scorecard_utilizacao` int(11) NOT NULL,
  `balanced_scorecard_importancia` int(11) NOT NULL,
  `planejamento_utilizacao` int(11) NOT NULL,
  `planejamento_importancia` int(11) NOT NULL,
  `gerenciamento_utilizacao` int(11) NOT NULL,
  `gerenciamento_importancia` int(11) NOT NULL,
  `orcamento_base_zero_utilizacao` int(11) NOT NULL,
  `orcamento_base_zero_importancia` int(11) NOT NULL,
  `orcamento_continuo_utilizacao` int(11) NOT NULL,
  `orcamento_continuo_importancia` int(11) NOT NULL,
  `gestao_utilizacao` int(11) NOT NULL,
  `gestao_importancia` int(11) NOT NULL,
  `lucratividade_utilizacao` int(11) NOT NULL,
  `lucratividade_importancia` int(11) NOT NULL,
  `custo_utilizacao` int(11) NOT NULL,
  `custo_importancia` int(11) NOT NULL,
  `orcamento_utilizacao` int(11) NOT NULL,
  `orcamento_importancia` int(11) DEFAULT NULL,
  `margem_utilizacao` int(11) DEFAULT NULL,
  `margem_importancia` int(11) DEFAULT NULL,
  `analise_variacoes_utilizacao` int(11) NOT NULL,
  `analise_variacoes_importancia` int(11) NOT NULL,
  `resultado_utilizacao` int(11) NOT NULL,
  `resultado_importancia` int(11) NOT NULL,
  PRIMARY KEY (`id_ferramenta`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;