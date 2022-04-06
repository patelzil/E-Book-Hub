FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY package-lock.json /app
RUN npm ci

# Bundle app source
COPY . /app

EXPOSE 5000
CMD [ "node", "server.js" ]
