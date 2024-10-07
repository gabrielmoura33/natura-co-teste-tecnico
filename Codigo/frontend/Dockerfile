FROM node:17 as ui-build
WORKDIR /usr/src/app/web
COPY package*.json ./
COPY . .
RUN npm
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "dev"]