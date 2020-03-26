'use strict';
module.exports = (sequelize, DataTypes) => {
  const HouseUtility = sequelize.define(
    'HouseUtility',
    {
      houseId: DataTypes.INTEGER,
      utilityId: DataTypes.INTEGER
    },
    {
      tableName: 'house_utilities'
    }
  );
  HouseUtility.associate = function(models) {
    // associations can be defined here
  };
  return HouseUtility;
};
