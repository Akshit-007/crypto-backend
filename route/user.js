const express=require('express');
const {userbyid , getuser , updateuser }=require('../controller/user')
const {requiresignin}=require('../controller/auth');


const router = express.Router();

router.get('/users/:userId',requiresignin, getuser);
router.put('/users/:userId',requiresignin, updateuser);

router.param("userId",userbyid);

module.exports =router;

