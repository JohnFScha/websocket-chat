import { Router } from 'express';
var userRouter = Router();

/* GET users listing. */
userRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default userRouter;
