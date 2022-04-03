FROM node:17-alpine
WORKDIR /e-book-hub
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "ci"]
CMD ["npm", "start"]