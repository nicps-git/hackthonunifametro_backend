-- CreateTable
CREATE TABLE cadastro_funcionario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT,
    email VARCHAR(255) UNIQUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE uf (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);


CREATE TABLE cidade (
    id SERIAL PRIMARY KEY,
    id_uf INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_uf) REFERENCES uf(id)
);

CREATE TABLE endereco (
    id SERIAL PRIMARY KEY,
    id_cidade INT NOT NULL,
    rua VARCHAR(255) NOT NULL,
    bairro VARCHAR(255),
    cep VARCHAR(20),
    numero VARCHAR(20),
    complemento VARCHAR(255),
    FOREIGN KEY (id_cidade) REFERENCES cidade(id)
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo_documento VARCHAR(50),
    sexo VARCHAR(20),
    telefone VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    data_nascimento DATE
);

CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE agendamento (
    id SERIAL PRIMARY KEY,
    status INT NOT NULL,
    descricao VARCHAR(255),
    FOREIGN KEY (status) REFERENCES status(id)
);


CREATE TABLE parentesco (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);


CREATE TABLE responsavel (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    id_parentesco INT NOT NULL,
    FOREIGN KEY (id_parentesco) REFERENCES parentesco(id)
);



CREATE TABLE especialidades (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE perfil (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE funcionario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE clinicas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE medicos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    documento VARCHAR(50),
    sexo VARCHAR(20),
    telefone VARCHAR(50),
    email VARCHAR(255) UNIQUE
);


