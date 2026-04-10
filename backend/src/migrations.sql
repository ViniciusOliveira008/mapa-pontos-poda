CREATE TABLE IF NOT EXISTS pontos (
    id INT NOT NULL,
    numero_oi VARCHAR(100) NOT NULL,
    tipo_plano VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    barramento VARCHAR(100) NOT NULL,
    servico VARCHAR(100) NOT NULL,
    status_defeito ENUM('executado', 'pendente') NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS registros (
    id INT NOT NULL AUTO_INCREMENT,
    data_execucao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT,
    equipe VARCHAR(100) NOT NULL,
    id_ponto INT NOT NULL,
    barramento VARCHAR(100) NOT NULL,
    tipo registro ENUM("manutencao", "nds") NOT NULL, 
 
    PRIMARY KEY (id),
    FOREIGN KEY (id_ponto) REFERENCES pontos(id)
);

CREATE TABLE IF NOT EXISTS nds (
    id INT NOT NULL, 
    barramento VARCHAR(100) NOT NULL,
    numero_nds VARCHAR(10) NOT NULL,
    oc VARCHAR(20) NOT NULL, 
    servico VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    status_defeito ENUM('executado', 'pendente') NOT NULL
);

CREATE TABLE IF NOT EXISTS pontos_manuais (
    id INT AUTO_INCREMENT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    barramento VARCHAR(100) NOT NULL,
    servico VARCHAR(100) NOT NULL,
    status_defeito ENUM('executado', 'pendente') NOT NULL,

    PRIMARY KEY (id)

ALTER TABLE pontos MODIFY id INT NOT NULL AUTO_INCREMENT;
);