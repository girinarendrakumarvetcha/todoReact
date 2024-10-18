const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ModAdmin = new Schema (
    {
        fullname    : {type: String,required :true},
        username    : {type: String,required :true,unique: true},
        email       : {type: String,required :true},
        password    : {type: String,required :true},
        usertype    : {type: String,required :true},
        addeddate   : {type: Date,required :false,default:Date.now},
    },
    {timestamp : true}  
);

ModAdmin.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
        delete ret.addeddate;
    }
});

module.exports = mongoose.model('mod_admin', ModAdmin,'mod_admin');