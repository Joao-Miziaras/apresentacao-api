# Usar a imagem Node.js como base
FROM node:19

# Criar o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Expor a porta usada pelo NestJS
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]
