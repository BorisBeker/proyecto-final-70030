FROM node
WORKDIR /coder70030
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080s
CMD ["npm","start"]