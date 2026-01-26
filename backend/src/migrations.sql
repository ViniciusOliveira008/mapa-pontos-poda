CREATE TABLE pontos (
    id VARCHAR(100) NOT NULL,
    numero_oi VARCHAR(100) NOT NULL,
    tipo_plano VARCHAR(100) NOT NULL,
    latitude REAL(10, 8) NOT NULL,
    longitude REAL(11, 8) NOT NULL,
    barramento VARCHAR(100) NOT NULL,
    servico VARCHAR(100) NOT NULL,
    status_defeito ENUM("executado", "") NOT NULL

    PRIMARY KEY (id)
)

CREATE TABLE registros (
    id INT NOT NULL AUTO_INCREMENT,
    data_execucao DATETIME NOT NULL,
    descricao TEXT,
    equipe VARCHAR(100) NOT NULL,
    id_ponto VARCHAR(100) NOT NULL,
    

    PRIMARY KEY (id)
    FOREIGN KEY (id_ponto) REFERENCES pontos(id) NOT NULL
)

