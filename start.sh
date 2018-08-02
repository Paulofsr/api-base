#! /bin/sh

npm install --production
mongod &
sleep 15
nodemon server.js