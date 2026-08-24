CREATE TABLE IF NOT EXISTS pontos (
    id INT NOT NULL AUTO_INCREMENT,
    numero_oi VARCHAR(100),
    tipo_plano VARCHAR(100),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    barramento VARCHAR(100) NOT NULL,
    servico VARCHAR(100) NOT NULL,
    tipo_linha VARCHAR(50) NOT NULL,
    status_defeito ENUM('executado', 'pendente') NOT NULL DEFAULT 'pendente',
    manual TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS registros (
    id INT NOT NULL AUTO_INCREMENT,
    data_execucao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT,
    equipe VARCHAR(100) NOT NULL,
    id_ponto INT NOT NULL,
    barramento VARCHAR(100) NOT NULL,
    tipo_linha VARCHAR(50) NOT NULL,
    tipo_registro ENUM('manutencao', 'nds') NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_ponto) REFERENCES pontos(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS nds (
    id INT NOT NULL AUTO_INCREMENT,
    barramento VARCHAR(100) NOT NULL,
    numero_nds VARCHAR(10) NOT NULL,
    oc VARCHAR(20) NOT NULL,
    servico VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    status_defeito ENUM('executado', 'pendente') NOT NULL,
    PRIMARY KEY (id)
);
