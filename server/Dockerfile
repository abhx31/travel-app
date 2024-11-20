FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript

RUN npx prisma generate

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]