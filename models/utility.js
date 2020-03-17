'use strict';
module.exports = (sequelize, DataTypes) => {
  const Utility = sequelize.define(
    'Utility',
    {
      name: DataTypes.STRING
    },
    {}
  );
  Utility.associate = function(models) {
    // associations can be defined here
    Utility.belongsTo(models.Location, {
      as: 'location',
      foreignKey: 'location_id'
    });
    Utility.hasMany(models.Product, {
      as: 'products'
    });
  };
  return Utility;
};
