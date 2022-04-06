FROM node:17-alpine
WORKDIR /e-book-hub
COPY package.json ./e-book-hub
RUN npm install
COPY . ./e-book-hub
EXPOSE 5000
CMD ["npm", "start"]