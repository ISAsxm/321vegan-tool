FROM node:22-alpine AS development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN NODE_OPTIONS=--max_old_space_size=4096 npm run build

FROM nginx:stable-alpine AS production

COPY --from=development /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]