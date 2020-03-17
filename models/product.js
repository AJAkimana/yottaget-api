'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {}
  );
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Location, {
      as: 'location',
      foreignKey: 'location_id'
    });
    Product.hasMany(models.Utility, {
      foreignKey: 'utility_id',
      as: 'utilities'
    });
    Product.hasMany(models.Image, {
      foreignKey: 'image_id',
      as: 'images'
    });
    Product.belongsTo(models.User, {
      as: 'landload',
      foreignKey: 'user_id'
    });
  };
  return Product;
};
