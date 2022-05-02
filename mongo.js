const mongoose = require('mongoose')
const config = require('./utils/config')

const connectionString = process.env.NODE_ENV === 'test'
  ? config.MONGODB_URI_TEST
  : config.MONGODB_URI

if (!connectionString) {
    console.error('Recuerda que tienes que tener un archivo .env con las variables de entorno definidas y el MONGO_DB_URI que servirá de connection string. En las clases usamos MongoDB Atlas pero puedes usar cualquier base de datos de MongoDB (local incluso).')
}

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })

process.on('uncaughtException', error => {
    console.error(error)
    mongoose.disconnect()
})