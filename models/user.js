'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      names: DataTypes.STRING,
      username: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      a_level: DataTypes.NUMBER,
      password: DataTypes.STRING,
      prev_passwords: DataTypes.STRING
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['username', 'phone']
        }
      ],
      underscored: true
    }
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Product, {
      as: 'products'
    });
  };
  return User;
};
