require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let MONGODB_URI_TEST = process.env.MONGODB_URI_TEST
let NODE_ENV = process.env

module.exports = {
  MONGODB_URI,
  MONGODB_URI_TEST,
  PORT,
  NODE_ENV
}