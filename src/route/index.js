const cartRoute = require("./cart.route")
const couponRoute = require("./coupon.route")

module.exports = (app) => {
  var productBaseUrl = '/api/v1.0/product'  

  app.use(productBaseUrl, cartRoute)
  app.use(productBaseUrl, couponRoute)
};
