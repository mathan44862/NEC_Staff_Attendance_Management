const express = require('express');
const controller = require('../controllers/LeaveDetails');
const router = express.Router();


router.post('/',controller.userLeaveDatails);
router.post('/leavecount',controller.userLeaveCount);
router.get('/',controller.userLeaves);
router.get('/staffsleavedetails',controller.staffsleavedetails);

module.exports = router;