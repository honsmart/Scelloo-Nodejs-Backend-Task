'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("companies", {
      id:{
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
};
