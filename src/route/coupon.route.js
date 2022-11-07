const express = require("express");
const router = express.Router();
var couponController = require("../controller/coupon.controller").coupon


router.post('/coupon', couponController);
module.exports = router;
 