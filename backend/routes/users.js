const userRouter = require('express').Router();
const userController = require('../controllers/users');
const auth = require('../middlewares/authenticate');

app.post('/users/register',userController.userRegisteration);
app.get('/users/login',auth,userController.userLogin);

module.exports = userRouter;