FROM node:20

WORKDIR /app

COPY ./chat-app/package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
