const Activity_log = require('../models/activity_log-model.js');
const Todo_list = require('../models/todo_list-model.js');

createActivityLog = (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a Todo details'
        })
    }
    const req_obj = {};
    
    req_obj['todoid']           = body.todo_id;
    req_obj['message']          = body.message;
    req_obj['actiontype']       = body.actiontype;
    const activity_log = new Activity_log(req_obj);
    if(!activity_log){
        return res.status(400).json({
            success : false,
            error : err
        })
    }
    
    activity_log.save(function(err,result){
        const statuscode = (err)?400:200;   
        
        return res.status(statuscode).json({
            err,
            data:{
                id : result._id,
                message : result.message,
                actiontype : result.actiontype
            },
            message: 'Activity log added successfully.'
        });
    });
} 

getActivityLogs = async (req, res) => {
    await Todo_list.find({ addeduserid: req.params.id}, (err, todo_list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!todo_list) {
            return res
                .status(404)
                .json({ success: false, error: `No User found ..!` })
        }

        Activity_log.find({ addeduserid: req.params.id}, (err, activity_log) => {
            const  activity_log_data = [];
            for( i in activity_log ){
                const dummy_arr = {}
                dummy_arr['id']         = activity_log[i]['_id'];
                dummy_arr['message']    = activity_log[i]['message'];
                dummy_arr['actiontype'] = activity_log[i]['actiontype'];
                activity_log_data.push(dummy_arr);
            }
            return res.status(200).json({ success: true, data: activity_log_data });
        });        
    }).catch(err => console.log(err))
}

module.exports = {
    createActivityLog,
    getActivityLogs
}