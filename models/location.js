'use strict';
export default (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      name: DataTypes.STRING,
    },
    { tableName: 'locations' },
    {
      indexes: [
        {
          unique: true,
          fields: ['name'],
        },
      ],
    }
  );
  Location.associate = function (models) {
    // associations can be defined here
    Location.hasMany(models.Utility, {
      as: 'utilities',
      foreignKey: 'locationId',
    });
    Location.hasMany(models.House, {
      as: 'houses',
      foreignKey: 'locationId',
    });
  };
  return Location;
};
