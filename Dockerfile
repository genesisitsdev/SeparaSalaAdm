# construir a aplicação
FROM node:14 as node
WORKDIR /app
COPY package.json /app/
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/
COPY ./environment.prod.ts /app/src/environments/
ARG env=prod
RUN npm run build:prod

# expor a aplicação na porta 80
FROM nginx:1.13
COPY --from=node /app/dist/SeparaSalaAdm /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80