# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 👇 Aceita argumento externo
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# 👇 Build com env do Vite
RUN npm run build

# Etapa final
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
