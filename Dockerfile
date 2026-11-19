FROM node:22-alpine

WORKDIR /workspace/SFMP_WEB
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

EXPOSE 5173
CMD ["sh", "-lc", "npm run dev -- --host 0.0.0.0 --port 5173"]
