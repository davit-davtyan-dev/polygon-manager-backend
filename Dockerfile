FROM node:slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "dist/app.js"]