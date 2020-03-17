'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      link: DataTypes.STRING
    },
    {}
  );
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id'
    });
  };
  return Image;
};
