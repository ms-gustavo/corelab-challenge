FROM node:20.3.1
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3012
CMD ["npm", "start"]