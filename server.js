const express = require('express');
const helmet = require('helmet');

//Router import here
// const usersRouter = require("./users/users-router.js");
const authRouter = require("./auth/authRouter");

//Global Middleware here
const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
res.send(`<h2> Node auth 1 project is UP! </h2>`)

})

// server.use('/api/users', protected, usersRouter);
server.use('/api/auth', authRouter);

module.exports = server;