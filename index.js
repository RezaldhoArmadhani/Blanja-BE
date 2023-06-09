/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const createError = require('http-errors')
const cors = require('cors');
const morgan = require('morgan')
const helmet = require("helmet");
const xss = require('xss-clean')
const app = express()
const mainRouter = require('./src/router/index')
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))
app.use('/', mainRouter);
app.use(helmet());
app.use(xss())
app.use('/img', express.static('src/upload'))
app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})

app.use((err,req,res,next)=>{
  const messageError = err.message || "internal server error"
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message : messageError
  })

})
app.listen(port, () => {
  console.log(`http://localhost:${port}/product`)
  console.log(`http://localhost:${port}/seller`)
  console.log(`http://localhost:${port}/customer`)
  console.log(`http://localhost:${port}/category`)
})
