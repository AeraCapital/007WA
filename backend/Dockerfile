# Start from the latest LTS version of Node.js
FROM node:lts

# Create a new directory in our Docker image for our application's code
WORKDIR /app

# Copy package.json and yarn.lock to Docker environment
COPY package.json yarn.lock ./

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
    
# Install all dependencies and build bcrypt in the Docker environment
RUN yarn install


# Copy the rest of the application code to the Docker environment
COPY . .

# Clean the dist directory and build the app
RUN rm -rf dist && yarn build

# Open the application on port 3000
EXPOSE 3000

# Start the application
CMD ["yarn", "start:dev"]
