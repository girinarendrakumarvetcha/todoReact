var socketio = require('socket.io');
const Todo_list = require('../models/todo_list-model.js');
const Activity_log = require('../models/activity_log-model.js');
var io = socketio();
  
createUserTodo = (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a Todo details'
        })
    }
    const req_obj = {};
    
    req_obj['userid']       = body.todo_user;
    req_obj['description']  = body.description;
    req_obj['priority']     = body.priority;
    req_obj['status']       = 'incomplete';

    const todo_list = new Todo_list(req_obj);
    if(!todo_list){
        return res.status(400).json({
            success : false,
            error : err
        })
    }
    
    todo_list.save(function(err,result){  
        
        if (err) {
            return res.status(200).json({ success: false, message: err })
        }

        if (!result) {
            return res
                .status(200)
                .json({ success: false, message: `Unable to save Todo..!`,data: {} })
        }
        
        return res.status(200).json({ success: true, data : result.toJSON(),message: 'Todo for user created successfully.' });

    });
} 

updateUserTodo = async (req,res) => {
    const body = req.body;

    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a Todo Details to update..!'
        })
    }
    Todo_list.findOne({_id : body.id},(err,todo_data) => {
        if(err){
            return res.status(400).json({err,message : 'Unable to find Todo Data..!'});
        }
        
        todo_data.status = (todo_data.status == 'incomplete') ? 'complete': 'incomplete';
        
       
        
        todo_data.save(function(err,result){
            const statuscode = (err)?400:200;  
            if (err) {
                return res.status(200).json({ success: false, message: err })
            }
    
            if (!result) {
                return res
                    .status(200)
                    .json({ success: false, message: `Unable to change status of Todo..!`,data: {} })
            }
            
            return res.status(200).json({ success: true, data : result.toJSON(),message: 'Todo status has been updated.' });

        });
    })
}


getUserTodoDetailById = async (req, res) => {
    
    await Todo_list.findOne({ _id: req.params.id }, (err, todo_list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!todo_list) {
            return res
                .status(200)
                .json({ success: false, error: `No Data found` })
        }

        const  todo_data = {};
        todo_data['id']   = todo_list._id;
        todo_data['description']   = todo_list.description;
        todo_data['priority']   = todo_list.priority;
        todo_data['status']       = todo_list.status;

        return res.status(200).json({ success: true, data: todo_data })
    }).catch(err => console.log(err));
}
/*Need Edit*/ 
getUserTodoList = async (req, res) => {
    await Todo_list.find({ userid: req.params.id}, (err, todo_list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!todo_list) {
            return res
                .status(404)
                .json({ success: false, error: `No User found ..!` })
        }
        const  todo_data = [];
        for( i in todo_list ){
            const dummy_arr = {}
            dummy_arr['id']          = todo_list[i]['_id'];
            dummy_arr['description']   = todo_list[i]['description'];
            dummy_arr['priority']   = todo_list[i]['priority'];
            dummy_arr['status']       = todo_list[i]['status'];
            todo_data.push(dummy_arr);
        }
        return res.status(200).json({ success: true, data: todo_data })
    }).sort({priority:1}).catch(err => console.log(err))
}



module.exports = {
    createUserTodo,
    updateUserTodo,
    getUserTodoDetailById,
    getUserTodoList
}