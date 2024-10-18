const express = require('express');
const ModAdminCtrl = require('../controllers/mod_admin-ctrl');
const router = express.Router();

router.post('/user/add',ModAdminCtrl.createUser);
router.get('/user/login/:user_name/:password', ModAdminCtrl.getUserDetails);
router.get('/user/fetch/:id', ModAdminCtrl.getUserDetailById);
router.get('/user/userlist/', ModAdminCtrl.getAllUserList);


module.exports = router;