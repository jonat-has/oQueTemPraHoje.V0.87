# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command


-- Criação da tabela Receita
CREATE TABLE receita (
  codigo INT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  imagem VARCHAR(300) NOT NULL,
  tempo_de_preparo INT NOT NULL,
  resumo VARCHAR(300) NOT NULL,
  instrucoes VARCHAR(3000) NOT NULL
);

-- Criação da tabela Ingredientes
CREATE TABLE ingredientes (
  codigo INT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  unidade VARCHAR(10) NOT NULL
);

-- Criação da tabela Cliente
CREATE TABLE cliente (
  codigo INT PRIMARY KEY,
  usuario VARCHAR(20) NOT NULL,
  senha VARCHAR(32) NOT NULL,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(30) NOT NULL
);

-- Criação da tabela Despensa
CREATE TABLE despensa (
  codigo INT PRIMARY KEY,
  codigo_cliente INT,
  FOREIGN KEY (codigo_cliente) REFERENCES Cliente(codigo)
);

-- Criação da tabela de relacionamento Receita_Utiliza_Ingredientes
CREATE TABLE ingredientes_receita (
  codigo_receita INT,
  codigo_ingrediente INT,
  qtd_ingrediente INT,
  FOREIGN KEY (codigo_receita) REFERENCES Receita(codigo),
  FOREIGN KEY (codigo_ingrediente) REFERENCES Ingredientes(codigo),
  PRIMARY KEY (codigo_receita, codigo_ingrediente)
);

-- Criação da tabela de relacionamento Despensa_Contem_Ingredientes
CREATE TABLE ingredientes_despensa (
  codigo_despensa INT,
  codigo_ingrediente INT,
  qtd_ingrediente INT,
  FOREIGN KEY (codigo_despensa) REFERENCES Despensa(codigo),
  FOREIGN KEY (codigo_ingrediente) REFERENCES Ingredientes(codigo),
  PRIMARY KEY (codigo_despensa, codigo_ingrediente)
);




INSERT INTO despensa VALUES
(1,1),
(2,2),
(3,3);


Script para popular as 3 tabelas acima:

-- Inserção de clientes
INSERT INTO cliente (codigo, usuario, senha, nome, email) VALUES
(1, 'enio', '123', 'Enio Batalha', 'enio@exemplo.com'),
(2, 'jonathas', '123', 'Jonathas Gabriel', 'jonathas@examplo.com'),
(3, 'lucas', '123', 'Lucas Emmanuel', 'lucas@examplo.com');

-- Inserção de receitas
INSERT INTO receita (codigo, nome, imagem, tempo_de_preparo, resumo, instrucoes) VALUES
(1, 'Receita 1', 'imagem1.jpg', 30, 'Resumo da Receita 1', 'Instruções da Receita 1'),
(2, 'Receita 2', 'imagem2.jpg', 45, 'Resumo da Receita 2', 'Instruções da Receita 2'),
(3, 'Receita 3', 'imagem3.jpg', 60, 'Resumo da Receita 3', 'Instruções da Receita 3'),
(4, 'Receita 4', 'imagem4.jpg', 15, 'Resumo da Receita 4', 'Instruções da Receita 4'),
(5, 'Receita 5', 'imagem5.jpg', 20, 'Resumo da Receita 5', 'Instruções da Receita 5');

-- Inserção de ingredientes
INSERT INTO ingredientes (codigo, nome, unidade) VALUES
(1, 'Ovo', 'und'),
(2, 'Leite', 'ml'),
(3, 'Farinho de Trigo', 'g'),
(4, 'Cebola', 'und'),
(5, 'Tomate', 'und'),
(6, 'Alho', 'und'),
(7, 'Limão', 'und'),
(8, 'Manteiga', 'g'),
(9, 'Sal', 'colheres'),
(10, 'Creme de leite', 'g');


-- Populando tabela ingredientes_receita
INSERT INTO ingredientes_receita (codigo_receita, codigo_ingrediente, qtd_ingrediente)
VALUES
  -- Receita 1
  (1, 1, 1), -- 1 ovo
  (1, 3, 500), -- 500 gramas de farinha de trigo
  (1, 8, 250), -- 250 gramas de manteiga
  
  -- Receita 2
  (2, 1, 2), -- 2 ovos
  (2, 4, 1), -- 1 cebola
  (2, 5, 2), -- 2 tomates
  (2, 6, 2), -- 2 dentes de alho
  
  -- Receita 3
  (3, 2, 500), -- 500 ml de leite
  (3, 3, 1000), -- 1000 gramas de farinha de trigo
  (3, 9, 2); -- 2 colheres de sal

-- Populando tabela ingredientes_despensa
INSERT INTO ingredientes_despensa (codigo_despensa, codigo_ingrediente, qtd_ingrediente)
VALUES
  -- Despensa Cliente 1
  (1, 1, 3), -- 3 ovos
  (1, 3, 1000), -- 1000 gramas de farinha de trigo
  (1, 8, 500), -- 500 gramas de manteiga
  
  -- Despensa Cliente 2
  (2, 1, 5), -- 5 ovos
  (2, 4, 2), -- 2 cebolas
  (2, 5, 3), -- 3 tomates
  (2, 6, 4), -- 4 dentes de alho
  
  -- Despensa Cliente 3
  (3, 2, 1000), -- 1000 ml de leite
  (3, 3, 2000), -- 2000 gramas de farinha de trigo
  (3, 9, 3); -- 3 colheres de sal

  -- RECEITA + INGREDIENTES
select * from (select codigo_receita
from ingredientes_receita IR left join ingredientes_despensa ID on IR.codigo_ingrediente = ID.codigo_ingrediente
and codigo_despensa = 1 and ir.qtd_ingrediente <= ID.qtd_ingrediente
group by codigo_receita
having count(IR.codigo_ingrediente) = count(ID.codigo_ingrediente)) receitas_OK
join receita on receitas_OK.codigo_receita = receita.codigo
join ingredientes_receita on ingredientes_receita.codigo_receita=receitas_OK.codigo_receita
join ingredientes on ingredientes.codigo=ingredientes_receita.codigo_ingrediente;

-- RECEITA
select * from receita where codigo in (select codigo_receita
from ingredientes_receita IR left join ingredientes_despensa ID on IR.codigo_ingrediente = ID.codigo_ingrediente
and codigo_despensa = 1 and ir.qtd_ingrediente <= ID.qtd_ingrediente
group by codigo_receita
having count(IR.codigo_ingrediente) = count(ID.codigo_ingrediente));

-- INGREDIENTES
select * from ingredientes where codigo in (select codigo_ingrediente from ingredientes_receita where codigo_receita in (select codigo_receita
from ingredientes_receita IR left join ingredientes_despensa ID on IR.codigo_ingredientes = ID.codigo_ingrediente
and codigo_despensa = 1 and ir.qtd_ingrediente <= ID.qtd_ingrediente
group by codigo_receita
having count(IR.codigo_ingredientes) = count(ID.codigo_ingrediente)));