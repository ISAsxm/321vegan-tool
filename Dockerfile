FROM node:22-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .
 
RUN npm run build

FROM nginx:stable-alpine as production

COPY --from=development /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]