const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes);
  const reducer = (accum, curr) => accum + curr;
  const total = likes.reduce(reducer);
  return total
}

const favouriteBlog = (list) => {
  const likes = list.map(blog => blog.likes);
  const mostLikes = Math.max(...likes);
  const favouriteIndex = likes.findIndex(like => like === mostLikes)
  return list[favouriteIndex];
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}