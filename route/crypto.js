
const express = require('express');
const router = express.Router()
const { userbyid } = require('../controller/user')
const { requiresignin } = require('../controller/auth');
const cryptoController = require("../controller/crypto")

router.post("/addToFav/:userId", requiresignin, cryptoController.addToFav);

router.put("/removeFromFav/:userId", requiresignin, cryptoController.removeFromFav);

router.get("/getFav/:userId", requiresignin, cryptoController.getFav);

router.post("/notification/:userId", requiresignin, cryptoController.postNotify);

router.post("/addSub/:userId", requiresignin, cryptoController.addSub);

router.get("/getSub/:userId", requiresignin, cryptoController.getSub);

router.post("/removeSub/:userId", requiresignin, cryptoController.removeSub);

router.param("userId", userbyid);


module.exports = router;

