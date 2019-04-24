FROM node:alpine
WORKDIR /usr/src/app
COPY . .

RUN apk add --update mysql mysql-client && rm -f /var/cache/apk/*
COPY my.cnf /etc/mysql/my.cnf
COPY my.cnf /etc/my.cnf.d/my.cnf

EXPOSE 8788
CMD [ "./startup.sh" ]