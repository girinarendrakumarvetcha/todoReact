const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TodoList = new Schema (
    {
        userid          : {type: String,required :true},
        description     : {type: String,required :true},
        priority        : {type: String,required :false, default:'low'},
        status          : {type: String,required :false, default:'incomplete'},
        addeduserid     : {type: String,required :false},
        addeddate       : {type: Date,required :false,default: Date.now},
        updateduserid   : {type: String,required :false},
        updateddate     : {type: Date,required :false,default: Date.now}
    },
    {timestamp : true}  
);

TodoList.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.addeduserid;
        delete ret.addeddate;
        delete ret.updateduserid;
        delete ret.updateddate;
    }
});


module.exports = mongoose.model('todolist', TodoList,'todolist');