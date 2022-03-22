const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sumOfLikes = blogs
    .map((blog) => blog.likes)
    .reduce((previous, current) => previous + current);
  return sumOfLikes;
};

const favouriteBlog = (blogs) => {
  const postsWithLikes = blogs.map((post) => [post.title, post.likes]);
  let best = ["", 0];
  postsWithLikes.forEach((entry) => {
    if (entry[1] > best[1]) {
      best = entry;
    } else best = best;
  });
  return best;
};

const mostBlogs = (blogs) => {
  let histogram = {};
  blogs.forEach((entry) => {
    const author = entry.author;
    if (!histogram.hasOwnProperty(author)) {
      histogram = { ...histogram, [author]: 1 };
    } else {
      histogram = { ...histogram, [author]: histogram[author] + 1 };
    }
  });
  let arr = [];
  for (key in histogram) {
    arr.push({ author: key, posts: histogram[key] });
  }
  const authorsWithPosts = arr.map((author) => [author.author, author.posts]);
  let best = ["", 0];
  authorsWithPosts.forEach((entry) => {
    if (entry[1] > best[1]) {
      best = entry;
    } else best = best;
  });
  return best;
};

const mostLiked = (blogs) => {
  let histogram = {};
  blogs.forEach((entry) => {
    const author = entry.author;
    const likes = entry.likes;
    if (!histogram.hasOwnProperty(author)) {
      histogram = { ...histogram, [author]: likes };
    } else {
      histogram = { ...histogram, [author]: histogram[author] + likes };
    }
  });
  let arr = [];
  for (key in histogram) {
    arr.push({ author: key, likes: histogram[key] });
  }
  const authorsWithLikes = arr.map((author) => [author.author, author.likes]);
  let best = ["", 0];
  authorsWithLikes.forEach((entry) => {
    if (entry[1] > best[1]) {
      best = entry;
    } else best = best;
  });
  return best;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLiked,
};
