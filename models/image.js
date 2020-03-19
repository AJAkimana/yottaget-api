'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      link: DataTypes.STRING
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['link', 'product_id']
        }
      ],
      underscored: true
    }
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
