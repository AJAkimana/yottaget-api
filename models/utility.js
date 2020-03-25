'use strict';
module.exports = (sequelize, DataTypes) => {
  const Utility = sequelize.define(
    'Utility',
    {
      name: DataTypes.STRING
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['name', 'locationId']
        }
      ]
    }
  );
  Utility.associate = function(models) {
    // associations can be defined here
    Utility.belongsTo(models.Location, {
      as: 'location',
      foreignKey: 'id'
    });
    Utility.hasMany(models.House, {
      as: 'houses'
    });
  };
  return Utility;
};
