FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "build"]

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]