const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

//Router import here
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/authRouter");
const dbConnection = require("./data/db_config")
const protected = require("./auth/protected-mw")

//Global Middleware here
const server = express();

const sessionConfiguration = {
    name: "theForce",
    secret: process.env.SECRET || "this is no the secret you are looking for",
    cookie: {
        maxAge: 1000 * 60 * 20, //after 20 mins the cookie expires
        secure:process.env.COOKIE_SECURE || false,
        httpOnly: true,
    },
    resave:false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex:dbConnection,
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60, //deletes expire sessions every 1hr
    })
}

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfiguration));


server.get('/', (req, res) => {
res.send(`<h2> Node auth 1 project is UP! </h2>`)

})

server.use('/api/users', protected, usersRouter);
server.use('/api/auth', authRouter);

module.exports = server;