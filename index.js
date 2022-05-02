require('./mongo')

const express = require('express');
const app = express();

const cors = require('cors');
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log('Server running on port: ', PORT)
})

module.exports = {app, server}