# build stage
FROM node:lts-alpine AS build-stage
ARG MODE
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --mode ${MODE}



# run stage
FROM nginx:stable-alpine AS run-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
