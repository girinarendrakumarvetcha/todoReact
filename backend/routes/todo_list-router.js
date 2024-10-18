const express = require('express');
const TodoLiatCtrl = require('../controllers/todo_list-ctrl');
const router = express.Router();

router.post('/todolist/add',TodoLiatCtrl.createUserTodo);
router.put('/todolist/update/', TodoLiatCtrl.updateUserTodo);
router.get('/todolist/fetch/:id', TodoLiatCtrl.getUserTodoDetailById);
router.get('/todolist/userlist/:id', TodoLiatCtrl.getUserTodoList);

module.exports = router