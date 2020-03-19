'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      name: DataTypes.STRING
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['name']
        }
      ],
      underscored: true
    }
  );
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.Utility, {
      foreignKey: 'utility_id',
      as: 'utilities'
    });
    Location.hasMany(models.Product, {
      foreignKey: 'product_id',
      as: 'products'
    });
  };
  return Location;
};
