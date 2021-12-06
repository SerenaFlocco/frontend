# build environment
FROM node:lts-alpine as builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
# Bundle app source
COPY . .
RUN npm run build

FROM nginx:stable
# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
# users are not allowed to listen on priviliged ports
RUN sed -i.bak 's/listen\(.*\)80;/listen 8081;/' /etc/nginx/conf.d/default.conf
EXPOSE 8081
# comment user directive as master process is run as user in OpenShift anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]