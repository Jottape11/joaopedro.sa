-- ==============================================================================
-- Schema SQL - CP3 Portfolio & BaaS Supabase
-- Tabelas e Políticas de Segurança (Row Level Security - RLS)
-- ==============================================================================

-- 1. Tabela de Mensagens de Contato (Requisito 4)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabela de Projetos em Destaque na Home (Requisito 5)
CREATE TABLE IF NOT EXISTS featured_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  repo_name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Habilita Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_projects ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Mensagens:
-- Visitantes anônimos podem submeter mensagens
CREATE POLICY "Visitantes podem enviar mensagens"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Apenas o dono autenticado pode ler, atualizar status e deletar mensagens
CREATE POLICY "Apenas admin lê mensagens"
ON contact_messages FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Apenas admin atualiza mensagens"
ON contact_messages FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Apenas admin deleta mensagens"
ON contact_messages FOR DELETE
TO authenticated
USING (true);

-- 5. Políticas de Projetos em Destaque:
-- Leitura pública para carregar a vitrine na Home
CREATE POLICY "Leitura pública dos destaques"
ON featured_projects FOR SELECT
TO anon, authenticated
USING (true);

-- Apenas admin pode alterar quais repositórios ficam em destaque
CREATE POLICY "Admin gerencia destaques"
ON featured_projects FOR ALL
TO authenticated
USING (true);

-- Destaques iniciais recomendados
INSERT INTO featured_projects (repo_name)
VALUES
  ('fastapi-game-center'),
  ('steam-store-analytics'),
  ('eco-impacto-brasil-portal')
ON CONFLICT (repo_name) DO NOTHING;
