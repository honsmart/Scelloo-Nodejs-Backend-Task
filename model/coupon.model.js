module.exports = (sequelize, Sequelize) => {
    const Coupon = sequelize.define("coupon", {
        couponCode: {
        type: Sequelize.STRING
      },
      discountType: {
        type: Sequelize.ENUM("fixed", "percentage", "fixed-percetage")
      },
      couponType: {
        type: Sequelize.ENUM("price", "quantity", "price-quantity")
      },
      minItem: {
        type: Sequelize.INTEGER
      },
      minPrice: {
        type: Sequelize.FLOAT
      },
      priceOff: {
        type: Sequelize.FLOAT
      },
      percentageOff: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.BOOLEAN            
      },
    });
    return Coupon;
  };