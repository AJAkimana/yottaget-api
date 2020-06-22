'use strict';
export default (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      link: DataTypes.STRING,
    },
    { tableName: 'images' },
    {
      indexes: [
        {
          unique: true,
          fields: ['link', 'house_id'],
        },
      ],
    }
  );
  Image.associate = function (models) {
    // associations can be defined here
    Image.belongsTo(models.House, {
      as: 'house',
      foreignKey: 'houseId',
    });
  };
  return Image;
};
