const express = require('express');
// const helmet = require('helmet');
const server = express();

const userRouter = require('./users/userRouter.js');

// server.use(helmet());
server.use(logger);
server.use(express.json());

server.use('/api/users', userRouter)

server.get('/', (req, res, userRouter) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//custom middleware

function logger(req, res, next) {
  console.log(`Logged ${req.url} using method ${req.method} at ${new Date()}`)

  next();
};

module.exports = server;
