CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    telefone VARCHAR(50) UNIQUE,
    nome VARCHAR(120),
    criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE mensagens (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    mensagem TEXT,
    resposta TEXT,
    origem VARCHAR(10),
    criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    status VARCHAR(20) DEFAULT 'aberto',
    prioridade VARCHAR(20) DEFAULT 'normal',
    responsavel VARCHAR(120),
    criado_em TIMESTAMP DEFAULT NOW()
);
