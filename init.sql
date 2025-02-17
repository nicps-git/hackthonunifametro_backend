CREATE TABLE IF NOT EXISTS uf 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 nome VARCHAR(n) NOT NULL,  
); 

CREATE TABLE IF NOT EXISTS cidade 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 id_uf INT,  
 nome VARCHAR(n),  
); 

CREATE TABLE IF NOT EXISTS endereco 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 id_cidade INT,  
 endereco VARCHAR(n),  
 bairro VARCHAR(n),  
 cep VARCHAR(n),  
 numero INT,  
 complemento VARCHAR(n),  
); 


CREATE TABLE IF NOT EXISTS usuarios 
( 
 nome VARCHAR(n),  
 tipo_documento VARCHAR(n),  
 sexo VARCHAR(n),  
 telefone VARCHAR(n),  
 email VARCHAR(n),  
); 



ALTER TABLE cidade ADD FOREIGN KEY(id_uf) REFERENCES uf (id_uf)
ALTER TABLE endereco ADD FOREIGN KEY(id_cidade) REFERENCES cidade (id_cidade)