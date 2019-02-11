FROM node:alpine
WORKDIR /usr/src/app
COPY . .

RUN apk add --update mysql mysql-client && rm -f /var/cache/apk/*
COPY my.cnf /etc/mysql/my.cnf

EXPOSE 8788
CMD [ "./startup.sh" ]