# Dockerfile para app unificado FastAPI + Next.js

# Etapa 1: Build do frontend Next.js
FROM node:20-alpine as frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Etapa 2: Build do backend Python
FROM python:3.10-slim as backend-build
WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .

# Etapa 3: Unificação e produção
FROM python:3.10-slim
WORKDIR /app
# Copia backend
COPY --from=backend-build /app /app
# Copia build do Next.js para /app/static e /app
COPY --from=frontend-build /frontend/public /app/static
COPY --from=frontend-build /frontend/.next/static /app/static
COPY --from=frontend-build /frontend/.next/standalone /app
COPY --from=frontend-build /frontend/.next/standalone/.next /app/.next

# Variáveis de ambiente
ENV PORT=8080
ENV NEXT_PUBLIC_API_URL=https://agente-gpt-backend.fly.dev

# Expor porta
EXPOSE 8080

# Comando para rodar FastAPI + servir estáticos
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
