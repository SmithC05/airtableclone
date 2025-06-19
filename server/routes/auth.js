const express = require('express');
const router =express.Router();
const {registeruser,loginuser} = require('../controller/authcontroller');


router.route('/register').post(registeruser);
router.route('/login').post(loginuser);

module.exports = router;