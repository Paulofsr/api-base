FROM alpine

RUN apk update && \
    apk add nodejs && \
    apk add nodejs-npm && \
    apk add mongodb && \
    mkdir /app && \
    mkdir /data && \
    mkdir /data/db && \
    npm install nodemon -g

WORKDIR /app

COPY . .

RUN chmod +x start.sh && \ 
    npm i 

EXPOSE 5555

CMD ["./start.sh"]
