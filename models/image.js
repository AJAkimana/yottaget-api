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
          fields: ['link', 'house_id']
        }
      ]
    }
  );
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.House, {
      as: 'house',
      foreignKey: 'houseId'
    });
  };
  return Image;
};
