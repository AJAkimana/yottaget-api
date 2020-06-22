'use strict';
export default (sequelize, DataTypes) => {
  const Utility = sequelize.define(
    'Utility',
    {
      name: DataTypes.STRING,
    },
    { tableName: 'utilities' },
    {
      indexes: [
        {
          unique: true,
          fields: ['name', 'locationId'],
        },
      ],
    }
  );
  Utility.associate = function (models) {
    // associations can be defined here
    Utility.belongsTo(models.Location, {
      as: 'location',
      foreignKey: 'id',
    });
    Utility.belongsToMany(models.House, {
      as: 'houses',
      through: 'house_utilities',
    });
  };
  return Utility;
};
