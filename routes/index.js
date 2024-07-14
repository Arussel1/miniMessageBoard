const express = require('express');
const router = express.Router();
const Message = require('../models/message')


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const messages = await Message.find().sort({ added: -1 }).exec();  // Fetch messages and sort by date
    res.render('index', { title: 'FFA Chat Room', messages: messages });
  } catch (err) {
    next(err);
  }
});

router.get('/new', function(req, res, next) {
  res.render('form', { title: "Mini Messageboard" });
});

router.post('/new', async (req, res, next) => {
  try {
    const newMessage = new Message({
      name: req.body.author,
      message: req.body.content,
      added: new Date()
    });
    
    await newMessage.save(); 

    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
