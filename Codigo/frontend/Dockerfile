# Codigo/frontend/Dockerfile
FROM node:18-alpine as ui-build
WORKDIR /usr/src/app/web
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
