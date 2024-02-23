FROM node:18.16

RUN mkdir -p /home/app

ENV NODE_ENV=dev

COPY . /home/app

WORKDIR /home/app

RUN npm install 

EXPOSE 3000

CMD ./deployServer.sh