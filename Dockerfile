# seta a imagem que será usada como base 
FROM node 

# diretorio que os arquivos vão ser salvos na container
WORKDIR /usr/app

# copia o package.config do projeto para dentro do workdir
COPY package.json ./

# instala os pacotes dentro da container
RUN npm install

# copia os demais arquivos do projeto para dentro do container
COPY . .

# define a porque que será usada
EXPOSE 3333

# define o comando que será executado para rodar a aplicação
CMD ["npm", "run", "dev"]