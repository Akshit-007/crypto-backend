const express=require('express');
const {signup , signin , signout }=require('../controller/auth')
const {userbyid}=require('../controller/user')
const {usersignupvalidator } = require('../validator');

const router = express.Router();

router.post('/signup', usersignupvalidator , signup);
router.post('/signin', signin);
router.get('/signout', signout);

// any route containing :
//userid ,our app will first execute userbyid()  
router.param("userId",userbyid);

module.exports =router;