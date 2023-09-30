# Gunakan node.js versi yang diinginkan sebagai base image
FROM node:14

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json (jika ada) ke dalam container
COPY package*.json ./

# Install dependensi npm
RUN npm install

# Salin kode aplikasi Anda ke dalam container
COPY . .

ENV PORT 8080
ENV HOST 0.0.0.0

# Port yang akan digunakan oleh Express.js
EXPOSE 8080

CMD ["node", "app.js"]