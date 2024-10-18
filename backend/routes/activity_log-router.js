const express = require('express');
const ActivitylogCtrl = require('../controllers/activity_log-ctrl');
const router = express.Router();

router.post('/activitylog/add',ActivitylogCtrl.createActivityLog);
router.put('/activitylog/list/:id', ActivitylogCtrl.getActivityLogs);

module.exports = router