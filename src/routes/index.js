import { Router } from 'express';

const indexRouter = Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('chat', {
    js: './javascripts/index',
    css: './stylesheets/index'
  });
});

export default indexRouter;
