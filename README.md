# Shopper Image API 🛒📸
API REST para processar e armazenar medições de água e gás a partir de imagens, com extração de valores usando o Google Gemini.

## 🚀 Tecnologias
- Node.js + TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Docker
- Google Gemini API
- Clean Architecture

## 📁 Estrutura do Projeto
src/
├── application/ # Casos de uso
├── domain/ # Entidades e interfaces
├── infrastructure/
│ ├── http/ # Controllers e rotas
│ ├── persistence/ # Repositórios e config do banco
│ └── main.ts # Inicialização do app

## ⚙️ Como rodar localmente

1. **Clone o repositório:**
git clone https://github.com/raulcazevedo/shopper-image-api.git
cd shopper-image-api

2. **Crie o arquivo .env**
DATABASE_URL="postgresql://postgres:postgres@db:5432/shopper?schema=public"
GEMINI_API_KEY="sua-chave-do-gemini"

3. **Suba os containers**
docker-compose up --build

4. **Acesse a aplicação:**
A API rodará na porta 80. Exemplos de endpoints:
- POST /upload – Enviar imagem
- GET /list – Listar medições
- POST /confirm – Confirmar leitura