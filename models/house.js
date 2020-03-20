'use strict';
module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define(
    'House',
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {}
  );
  House.associate = models => {
    // associations can be defined here
    House.belongsTo(models.Location, {
      as: 'location',
      foreignKey: 'locationId'
    });
    House.hasMany(models.Utility, {
      foreignKey: 'id',
      as: 'utilities'
    });
    House.hasMany(models.Image, {
      as: 'images'
    });
    House.belongsTo(models.User, {
      as: 'landlord',
      foreignKey: 'userId'
    });
  };
  return House;
};
