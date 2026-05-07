FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 6002
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "6002"]
