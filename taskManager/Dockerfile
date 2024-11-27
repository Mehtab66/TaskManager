# Use a base Ubuntu image
FROM ubuntu:20.04

# Prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Update the package list and install curl
RUN apt-get update && apt-get install -y curl

# Add Node.js repository and install Node.js
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get upgrade -y && \
    apt-get install -y nodejs

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Define the entry point to run the app
ENTRYPOINT [ "node", "app.js" ]
