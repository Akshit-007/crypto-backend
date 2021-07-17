
const express=require('express');
const router = express.Router()
const {userbyid , getuser , updateuser }=require('../controller/user')
const {requiresignin}=require('../controller/auth');
const cryptoController = require("../controller/crypto")

router.post("/addToFav/:userId",requiresignin ,cryptoController.addToFav);

router.get("/getFav/:userId",requiresignin ,cryptoController.getFav);

router.post("/notification/:userId",requiresignin ,cryptoController.postNotify);

router.param("userId",userbyid);


module.exports =router;