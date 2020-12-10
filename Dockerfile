FROM node:14.15.1-buster

WORKDIR /app

COPY /myapp/package*.json /app/

RUN npm install

RUN npm install -g nodemon

COPY /myapp/ /app/

EXPOSE 3000

CMD ["nodemon"]