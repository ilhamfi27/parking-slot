## stage one or build step
FROM node:14.17-alpine3.14

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install
RUN npm run build

## stage two or run step

FROM node:14.17-alpine3.14

COPY package*.json ./

RUN npm install --only=production

COPY --from=0 /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
