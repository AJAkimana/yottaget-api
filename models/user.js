'use strict';
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      names: DataTypes.STRING,
      username: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      a_level: DataTypes.NUMBER,
      password: DataTypes.STRING,
      prev_passwords: DataTypes.STRING,
    },
    { tableName: 'users' },
    {
      indexes: [
        {
          unique: true,
          fields: ['username', 'phone'],
        },
      ],
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.House, {
      as: 'houses',
      foreignKey: 'id',
    });
  };
  return User;
};
