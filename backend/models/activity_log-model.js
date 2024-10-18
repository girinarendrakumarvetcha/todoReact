const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ActivityLog = new Schema (
    {
        todoid          : {type: String,required :true},
        message         : {type: String,required :true},
        actiontype      : {type: String,required :false},
        addeduserid     : {type: String,required :false},
        addeddate       : {type: Date,required :false,default: Date.now}
    },
    {timestamp : true}  
);

ActivityLog.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});


module.exports = mongoose.model('activitylog', ActivityLog,'activitylog');