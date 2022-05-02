const supertest = require('supertest')
const {app} = require('../index')
const api = supertest(app);

const initialBlogs = [
  {
    title: 'Re0',
    author: 'Qoqo Baldovino',
    url: "https://residentevil.fandom.com/es/wiki/Re0",
    likes: 10, 
  },
  {
    title: 'Re1',
    author: 'Capcom',
    url: "https://residentevil.fandom.com/es/wiki/Re1",
    likes: 20, 
  }
]

const getFromBlogs = async () => {
  const response = await api.get('/api/blogs')
  return {
    authors: response.body.map(blog => blog.author),
    response
  }
}

module.exports = {
  api,
  initialBlogs,
  getFromBlogs
}