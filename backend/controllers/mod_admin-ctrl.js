const Mod_admin = require('../models/mod_admin-model.js');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
createUser = async (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a User details'
        })
    }
    const req_obj = {};
    
    req_obj['fullname']     = body.fullname;
    req_obj['username']     = body.username;
    req_obj['email']        = body.email;
    req_obj['password']     = body.password;
    req_obj['usertype']     = body.userType;
    // req_obj['addedDate']    = body.ma_added_date;

    
    const mod_admin = new Mod_admin(req_obj);
    if(!mod_admin){
        return res.status(400).json({
            success : false,
            error : err
        })
    }
    
    mod_admin.save(function(err,result){
        
        let success = true;
        let message = 'User created successfully.';
        if( err && err.name === 'MongoError' && 
            (11000 === err.code || 11001 === err.code)
        ){
            success = false;
            message = 'User Name already exists..!';
        }
        const ret_arr = {success,message, result, err};
        
        
        return res.status(200).json(ret_arr);
    });
} 

getUserDetails = async (req, res) => {
    
    await Mod_admin.findOne({ username: req.params.user_name,password: req.params.password }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, message: err })
        }

        if (!user) {
            return res
                .status(200)
                .json({ success: false, message: `User not found...!`,data: {} })
        }
        
        const token = jwt.sign({ sub: user._id }, config.secret, { expiresIn: '7d' });
        return res.status(200).json({ success: true, data: user.toJSON(),token });
    }).catch(err => console.log(err));
}
getUserDetailById = async (req, res) => {
    console.log(req.params);
    await Mod_admin.findOne({ _id: req.params.id }, (err, mod_admin) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!mod_admin) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        const  user_data = {};
        user_data['ma_id']          = mod_admin._id;
        user_data['ma_full_name']   = mod_admin.fullname;
        user_data['ma_user_name']   = mod_admin.username;
        user_data['ma_email']       = mod_admin.email;
        user_data['ma_password']    = mod_admin.password;
        user_data['ma_user_type']   = mod_admin.usertype;
        return res.status(200).json({ success: true, data: user_data })
    }).catch(err => console.log(err));
}

jwtUserAuthenticationById = async (req) => {
    return Mod_admin.findById(req.sub);
}

getUserList = async (req, res) => {
    await Mod_admin.find({}, (err, mod_admin) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!mod_admin) {
            return res
                .status(404)
                .json({ success: false, error: `No User found ..!` })
        }
        const  user_data = [];
        for( i in mod_admin ){
            const dummy_arr = {}
            dummy_arr['ma_id']          = mod_admin[i]['_id'];
            dummy_arr['ma_full_name']   = mod_admin[i]['fullname'];
            dummy_arr['ma_user_name']   = mod_admin[i]['username'];
            dummy_arr['ma_email']       = mod_admin[i]['email'];
            dummy_arr['ma_password']    = mod_admin[i]['password'];
            dummy_arr['ma_user_type']   = mod_admin[i]['usertype'];
            user_data.push(dummy_arr);
        }
        return res.status(200).json({ success: true, data: user_data })
    }).catch(err => console.log(err))
}

getAllUserList = async (req, res) => {
    await Mod_admin.find({usertype:'user'}, (err, mod_admin) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!mod_admin) {
            return res
                .status(404)
                .json({ success: false, error: `No User found ..!` })
        }
        const  user_data = [];
        for( i in mod_admin ){
            const dummy_arr = {}
            dummy_arr['ma_id']          = mod_admin[i]['_id'];
            dummy_arr['user_name']   = mod_admin[i]['fullname'];
            user_data.push(dummy_arr);
        }
        return res.status(200).json({ success: true, data: user_data })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    getUserDetails,
    getUserDetailById,
    getUserList,
    getAllUserList,
    jwtUserAuthenticationById
}