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
      ]
    }
  );
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.Utility, {
      as: 'utilities',
      foreignKey: 'locationId'
    });
    Location.hasMany(models.House, {
      as: 'houses',
      foreignKey: 'locationId'
    });
  };
  return Location;
};
