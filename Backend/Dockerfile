FROM node:17-alpine
WORKDIR /e-book-hub
COPY . .
RUN npm install
EXPOSE 5000
EXPOSE 3005
CMD ["npm", "ci"]
CMD ["npm", "start"]
