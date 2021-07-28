const express = require('express');
const { getcoinUSD, getcoinINR, getcoinEUR, getfavcoinUSD, getfavcoinINR, getfavcoinEUR } = require('../controller/coin')
const router = express.Router();



router.get('/coins/USD', getcoinUSD);
router.get('/coins/INR', getcoinINR);
router.get('/coins/EUR', getcoinEUR);
router.get('/coins/favusd', getfavcoinUSD);
router.get('/coins/favinr', getfavcoinINR);
router.get('/coins/faveur', getfavcoinEUR);

module.exports = router;