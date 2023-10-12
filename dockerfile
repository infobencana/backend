# Use the desired version of Node.js as the base image
FROM node:16-slim

# Install pnpm
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if any) into the container
COPY package.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy your application code into the container
COPY . .

# Port used by Express.js
EXPOSE 8080

CMD ["pnpm", "start"]
