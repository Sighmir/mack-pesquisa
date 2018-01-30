use controladoria;

CREATE TABLE `usuario_objetivo` (
  `id_usr_obj` int(11) NOT NULL AUTO_INCREMENT,
  `id_usr` int(50) DEFAULT NULL,
  `id_obj` int(50) DEFAULT NULL,
  `nota` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_usr_obj`),
  foreign key (`id_obj`) references objetivo (`obj_id`)
);

CREATE TABLE `usuario_indicador` (
  `id_usr_ind` int(11) NOT NULL AUTO_INCREMENT,
  `id_usr` int(50) DEFAULT NULL,
  `id_ind` int(50) DEFAULT NULL,
  `nota` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_usr_ind`),
  foreign key (`id_ind`) references indicador (`ind_id`)
);

CREATE TABLE `usuario_ferramenta` (
  `id_usr_ferr` int(11) NOT NULL AUTO_INCREMENT,
  `id_usr` int(50) DEFAULT NULL,
  `id_ferr` int(50) DEFAULT NULL,
  `nota` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_usr_ferr`),
  foreign key (`id_ferr`) references ferramenta (`ferr_id`)
);





