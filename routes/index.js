const express = require('express');
const router = express.Router();
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "FFA Chat Room", messages: messages });
});

router.get('/new', function(req, res, next) {
  res.render('form', { title: "Mini Messageboard" });
});

router.post('/new', (req, res, next) => {
  messages.push({text: req.body.content, user: req.body.author, added: new Date()});
  res.redirect('/')
})

module.exports = router;
