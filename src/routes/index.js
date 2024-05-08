import { Router } from 'express';
import { MessageModel } from '../models/chat.model.js';

const indexRouter = Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('chat', {
    js: './javascripts/index',
    css: './stylesheets/index'
  });
});

indexRouter.get('/stored', async(req, res, next) => {
  const messages = await MessageModel.find();
  
  res.render('messages', {
    js: './javascripts/messages',
    css: './stylesheets/index',
    messages: messages,
  })
})

export default indexRouter;
