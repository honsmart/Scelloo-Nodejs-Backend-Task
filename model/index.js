'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};



let sequelize;
if (config.use_env_variable) {
  // sequelize = new Sequelize(String(process.env[config.use_env_variable],), config);
  sequelize = new Sequelize("d3t8fc3k83a2g5", "lyxrqhhnusjets", "ba83dd9b9dc43ecd5a08b5c7bf014d649f98dfb720ec6805dd6b78827d0a8771", config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    const files = [
      "coupon.model.js",
      "product.model.js",
    ];
    return (
      files.indexOf(file) >= 0 &&
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;