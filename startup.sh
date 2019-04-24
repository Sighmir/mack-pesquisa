#!/bin/sh

if [ -d /app/mysql ]; then
  echo "[i] MySQL directory already present, skipping creation"
else
  echo "[i] MySQL data directory not found, creating initial DBs"

  mysql_install_db --user=root > /dev/null

  if [ "$MYSQL_ROOT_PASSWORD" = "" ]; then
    MYSQL_ROOT_PASSWORD=root
    echo "[i] MySQL root Password: $MYSQL_ROOT_PASSWORD"
  fi

  MYSQL_DATABASE=${MYSQL_DATABASE:-""}
  MYSQL_USER=${MYSQL_USER:-""}
  MYSQL_PASSWORD=${MYSQL_PASSWORD:-""}

  if [ ! -d "/run/mysqld" ]; then
    mkdir -p /run/mysqld
  fi

  tfile=`mktemp`
  if [ ! -f "$tfile" ]; then
      return 1
  fi

  cat << EOF > $tfile
USE mysql;
FLUSH PRIVILEGES;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY "$MYSQL_ROOT_PASSWORD" WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;
UPDATE user SET password=PASSWORD("root") WHERE user='root' AND host='localhost';
CREATE DATABASE controladoria;
USE controladoria;
CREATE TABLE usuario (
  id int(11) NOT NULL AUTO_INCREMENT,
  nome varchar(50) DEFAULT NULL,
  email varchar(50) DEFAULT NULL,
  senha varchar(250) DEFAULT NULL,
  empresa varchar(50) DEFAULT NULL,
  perfil varchar(50) DEFAULT NULL,
  data_cadastro date DEFAULT NULL,
  ultimo_acesso date DEFAULT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE dados_usuario (
  id_dados_usuario int(11) NOT NULL AUTO_INCREMENT,
  id_usuario int(11) NOT NULL,
  faturamento_empresa varchar(100) NOT NULL,
  regiao_empresa varchar(100) NOT NULL,
  segmento_empresa varchar(100) NOT NULL,
  conhecimento_ferramentas varchar(100) NOT NULL,
  grau_volatilidade varchar(100) NOT NULL,
  margem_contribuicao varchar(50) NOT NULL,
  percentual_equilibrio varchar(50) NOT NULL,
  margem_seguranca varchar(50) NOT NULL,
  diversificacao_clientes varchar(100) NOT NULL,
  data_acesso date DEFAULT NULL,
  PRIMARY KEY (id_dados_usuario),
  CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
EOF

  if [ "$MYSQL_DATABASE" != "" ]; then
    echo "[i] Creating database: $MYSQL_DATABASE"
    echo "CREATE DATABASE IF NOT EXISTS \`$MYSQL_DATABASE\` CHARACTER SET utf8 COLLATE utf8_general_ci;" >> $tfile

    if [ "$MYSQL_USER" != "" ]; then
      echo "[i] Creating user: $MYSQL_USER with password $MYSQL_PASSWORD"
      echo "GRANT ALL ON \`$MYSQL_DATABASE\`.* to '$MYSQL_USER'@'%' IDENTIFIED BY '$MYSQL_PASSWORD';" >> $tfile
    fi
  fi

  /usr/bin/mysqld --user=root --bootstrap --verbose=0 < $tfile
  rm -f $tfile
  rm -f my.cnf
  rm -f /etc/my.cnf.d/*
fi


exec /usr/bin/mysqld --user=root --console & npm start