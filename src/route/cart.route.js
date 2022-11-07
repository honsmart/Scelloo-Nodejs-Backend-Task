const express = require("express");
const router = express.Router();
var cartController = require("../controller/cart.controller").cart


router.post('/cart', cartController);
module.exports = router;
 