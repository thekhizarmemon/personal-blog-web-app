const express = require(`express`);
const bodyParser = require(`body-parser`);
const ejs = require(`ejs`);
const _ = require(`lodash`);

const port = 3000;
const app = express();

app.set(`view engine`, `ejs`);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`public`));
app.locals._ = _;

const posts = [];

app.get(`/`, (req, res) => {
  res.render(`home`, { newPost: posts });
});

app.get(`/about`, (req, res) => {
  res.render(`about`);
});

app.get(`/contact`, (req, res) => {
  res.render(`contact`);
});

app.get(`/compose`, (req, res) => {
  res.render(`compose`);
});

app.post(`/compose`, (req, res) => {
  const newPost = {
    postTitle: req.body.postTitle,
    postBody: req.body.postBody,
  };
  posts.push(newPost);
  res.redirect(`/`);
});

app.get(`/posts/:postTitle`, (req, res) => {
  const requestedPostTitle = _.lowerCase(req.params.postTitle);

  posts.forEach((post) => {
    storedPostTitle = _.lowerCase(post.postTitle);
    if (requestedPostTitle === storedPostTitle) {
      res.render(`post`, { postTitle: post.postTitle, postBody: post.postBody });
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
