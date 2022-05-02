const blogsRouter = require('express').Router();
const { update } = require('../modules/blog');
const Blog = require('../modules/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  if (!request.body.author || !request.body.title || !request.body.url) {
    return response.status(400).json({
      error: 'check the required fields'
    })
  }

  if(!request.body.likes){
    request.body.likes = 0;
  }

  const blog = new Blog(request.body)

  try{
    const savedBlog = await blog.save()
    response.json(savedBlog)
  }catch(error){
    response.status(404).json(error)
  }
  
  
})

blogsRouter.put('/:id', async (request, response) => {
  const {id} = request.params;

  if(!request.body.likes){
    return response.status(400).json({
      error: 'check the required fields'
    })
  } 

  try {
    const finded = await Blog.find({_id: id});

    const updatedBlog = {
      title: finded[0].title,
      author: finded[0].author,
      url: finded[0].url,
      likes: request.body.likes,
    }

    const updated = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
    response.json(updated)

  } catch (error) {
    response.status(404).json(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const {id} = request.params;

  const res = await Blog.findByIdAndDelete(id)
  if(res === null) return response.sendStatus(404)

  response.status(204).end()
})

module.exports = blogsRouter