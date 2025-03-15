const taskRouter = require('express').Router();
const auth = require('../middlewares/authenticate');

const taskController = require('../controllers/tasks');

app.post('/tasks/create', auth ,taskController.create);
app.get('/tasks/all',auth, taskController.getAllTasks);
app.put('/tasks/update/:_id', auth,taskController.updateTask);
app.delete('/tasks/delete/:_id',auth, taskController.deleteTask);


module.exports = taskRouter;