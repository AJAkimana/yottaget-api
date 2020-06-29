'use strict';
export default (sequelize, DataTypes) => {
  const House = sequelize.define(
    'House',
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      coverImage: DataTypes.STRING,
      type: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    { tableName: 'houses' }
  );
  House.associate = (models) => {
    // associations can be defined here
    House.belongsTo(models.Location, {
      as: 'location',
      foreignKey: 'locationId',
    });
    House.belongsToMany(models.Utility, {
      as: 'utilities',
      through: 'house_utilities',
    });
    House.hasMany(models.Image, {
      as: 'images',
    });
    House.belongsTo(models.User, {
      as: 'landlord',
      foreignKey: 'userId',
    });
  };
  return House;
};
