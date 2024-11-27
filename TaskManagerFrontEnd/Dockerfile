FROM ubuntu
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get upgrade -y && \
    apt-get install -y nodejs
COPY package*.json ./
RUN npm install
COPY . .
ENTRYPOINT [ "node", "main.jsx" ]
