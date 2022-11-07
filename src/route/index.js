const cartRoute = require("./cart.route")
const couponRoute = require("./coupon.route")

module.exports = (app) => {
  var baseUrl = '/api/v1.0/product'  

  app.use(baseUrl, cartRoute)
  app.use(baseUrl, couponRoute)
};
