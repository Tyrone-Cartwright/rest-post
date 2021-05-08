const express = require('express');
const app = express();
const posts = require('./posts.json');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded());

app.get('/posts', (req, res) => {
  // fetch all posts
  // send the posts as a response to the client
  return res.json({ posts });
});

app.get('/posts/:id', (req, res) => {
  // fetch req.params.id
  let id = req.params.id;
  // find post with id
  let foundPost = posts.find((post) => {
    return String(post.id) === id;
  });
  if (foundPost) {
    return res.status(200).json({ post: foundPost });
  } else {
    return res.status(404).json({ message: 'post not found' });
  }
});

// create new post
app.post('/posts', (req, res) => {
  console.log(req.body.newPost);
  // create a new post from client's request
  // save new post to existing database
  posts.push(req.body.newpost);
  // save updated data to posts.json
  // stringify the json data
  let stringedData = JSON.stringify(posts, null, 2);
  //rewrite the file posts.json
  fs.writeFileSync('posts.json', stringedData, function (err) {
    if (err) {
      return res.status(500).json({ message: err });
    }
  });
  // send back a response to client
  return res.status(200).json({ message: 'New post created' });
});

app.put('/posts/:id', (req, res) => {
  res.json({
    title: req.body.title,
    body: req.body.body,
  });
});

app.listen(3000, () => {
  console.log('Server is up and running!');
});
