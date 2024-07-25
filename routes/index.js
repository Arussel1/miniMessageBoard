const express = require('express');
const router = express.Router();
const Message = require('../db/queries');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.getAllMessages();
    res.render('index', { title: 'Chat Room', messages });
  } catch (error) {
    next(error);
  }
});



router.get('/new', (req, res, next) => {
  res.render('form', { title: "Mini Messageboard" });
});

router.post('/new', async (req, res, next) => {
  try {
    await Message.addMessage(req.body.author,req.body.content); 
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
