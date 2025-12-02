-- Criação das tabelas para o Agente GPT Master Ouro

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  plano VARCHAR(50) DEFAULT 'pendente',
  ativo BOOLEAN DEFAULT FALSE,
  admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agentes (para o Admin gerenciar ou listar)
CREATE TABLE IF NOT EXISTS agents (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  prompt_base TEXT,
  ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de Logs (Histórico de Conversas)
CREATE TABLE IF NOT EXISTS logs (
  id SERIAL PRIMARY KEY,
  agent_id INTEGER REFERENCES agents(id),
  usuario VARCHAR(255), -- Email do usuário
  mensagem TEXT,
  resposta TEXT,
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pagamentos
CREATE TABLE IF NOT EXISTS pagamentos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  valor DECIMAL(10, 2),
  metodo VARCHAR(50),
  status VARCHAR(50), -- pendente, aprovado, recusado
  referencia VARCHAR(255), -- ID do Mercado Pago
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir um usuário Admin padrão (Senha: admin123)
INSERT INTO users (nome, email, senha, plano, ativo, admin) 
VALUES ('Admin Master', 'admin@masterouro.com', '$2a$10$ifIkBEBGd8Go4vm6DaHvBOvRcIyOczLETvq07U2zk86fwYJvkGJJW', 'master', true, true)
ON CONFLICT (email) DO NOTHING;

-- Inserir Agente Padrão
INSERT INTO agents (nome, descricao, prompt_base)
VALUES ('Master Ouro', 'Agente principal de vendas e suporte', 'Você é o Agente GPT Master Ouro...')
ON CONFLICT DO NOTHING;
