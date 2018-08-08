#! /bin/sh

mongod &
sleep 15
nodemon server.js