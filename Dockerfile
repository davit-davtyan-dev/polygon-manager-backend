FROM node:slim
WORKDIR /usr/app
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "dist/app.js"]