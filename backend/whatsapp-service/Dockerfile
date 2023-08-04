# Use an official Node.js runtime as a base image
FROM node:17-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN apt-get update -y &&  apt install chromium -y

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install Puppeteer
RUN npm install puppeteer

# Install typescript and ts-node globally
RUN npm install -g typescript ts-node

# Install any node packages
RUN npm install

# Bundle the source
COPY . .

# Run the app when the container launches
CMD ["ts-node", "app.ts"]
