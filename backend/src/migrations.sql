CREATE TABLE IF NOT EXISTS pontos (
    id VARCHAR(100) NOT NULL,
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
    id_ponto VARCHAR(100) NOT NULL,
    

    PRIMARY KEY (id),
    FOREIGN KEY (id_ponto) REFERENCES pontos(id)
);