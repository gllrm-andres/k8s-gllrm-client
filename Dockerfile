FROM node:lts as builder
WORKDIR /app
COPY package*.json ./
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
RUN npm install 
COPY . .
RUN npm run build


FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist/gllrm-client .

ENTRYPOINT ["nginx", "-g", "daemon off;"]