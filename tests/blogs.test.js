const {server} = require('../index')
const mongoose = require('mongoose')
const Blog = require('../modules/blog')
const {initialBlogs, api, getFromBlogs} = require('./helpers')


beforeEach(async () => {
  await Blog.deleteMany({})
  
  for(const blog of initialBlogs){
    const blogObject = new Blog(blog);
    await blogObject.save()
  }
})

describe('GET', () => {

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
      
  })

  test('there is qoqo', async () => {
    const response = await api.get('/api/blogs')
    const authors = response.body.map(blog => blog.author)
    expect(authors).toContain('Qoqo Baldovino')
    //expect(response.body[0].author).toBe('Qoqo Baldovino') 
  })
})

describe('POST', () => {

  test('a valid blog can be added', async () => {

    const newBlog = {
     title: 'Re2',
     author: 'Qoqo',
     url: "https://residentevil.fandom.com/es/wiki/Re2",
     likes: 0,
    }
   
    await api
     .post('/api/blogs')
     .send(newBlog)
     .expect(200)
     .expect('Content-Type', /application\/json/)
   
     const response = await api.get('/api/blogs');
     expect(response.body).toHaveLength(initialBlogs.length + 1);
  })

  test('a valid blog can be added without likes prop', async () => {

    const newBlog = {
     title: 'Re2',
     author: 'Qoqo',
     url: "https://residentevil.fandom.com/es/wiki/Re2",
    }
   
    await api
     .post('/api/blogs')
     .send(newBlog)
     .expect(200)
     .expect('Content-Type', /application\/json/)
   
     const response = await api.get('/api/blogs');
  
     expect(response.body[response.body.length - 1]).toHaveProperty('id')
     expect(response.body).toHaveLength(initialBlogs.length + 1);
  })
  
  test('a blog without name isnt valid', async () => {
    const newBlog = {
     title: 'Re3',
     url: "https://residentevil.fandom.com/es/wiki/Re3",
     likes: 10,
    }
   
    await api
     .post('/api/blogs')
     .send(newBlog)
     .expect(400)
   
     const response = await api.get('/api/blogs');
     expect(response.body).toHaveLength(initialBlogs.length);
  })

  test('a blog without likes would have 0 likes', async () => {
    const newBlog = {
      author: 'Pedro',
      title: 'Re3',
      url: "https://residentevil.fandom.com/es/wiki/Re3"
     }

     await api
     .post('/api/blogs')
     .send(newBlog)
     .expect(200)
     .expect('Content-Type', /application\/json/)
     
     const response = await api.get('/api/blogs');
     expect(response.body[response.body.length - 1]).toHaveProperty('likes')
     expect(response.body[response.body.length - 1].likes).toEqual(0)
  })
})

describe('DELETE', () => {

  test('a note can be deleted', async () => {
    const firstResponse = await api.get('/api/blogs');
    const { body: blogs } = firstResponse
    const noteToDelete = blogs[0]
  
    await api
      .delete(`/api/blogs/${noteToDelete.id}`)
      .expect(204)
  
    const lastResponse = await api.get('/api/blogs')
    const authors = lastResponse.body.map(blog => blog.author)
  
    expect(lastResponse.body).toHaveLength(initialBlogs.length - 1)
    expect(authors).not.toContain(noteToDelete.content)
  })

  test('a note that do not exist can not be deleted', async () => {
    await api
      .delete('/api/notes/1234')
      .expect(404)
    
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
  })

})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})