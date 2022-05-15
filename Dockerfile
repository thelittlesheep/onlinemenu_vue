FROM node:lts-alpine3.14 AS development

WORKDIR /usr/src/app

COPY ./package*.json ./

# RUN npm install -g @vue/cli

RUN npm install

# RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# RUN npm rebuild @vue/cli-service

COPY . .

EXPOSE 3001

CMD ["npm","run","dev"]