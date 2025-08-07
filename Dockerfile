#docker file frant freat 19 with cmd npm run dev
FROM node:19
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]