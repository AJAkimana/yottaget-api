'use strict';
const hashPassword = require('../helpers/util').hashPassword;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          names: 'Admin user',
          username: 'adminuser',
          email: 'adminuser@email.com',
          phone: '0783543016',
          password: hashPassword('MyPassword'),
          a_level: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          names: 'Landload user',
          username: 'landload',
          phone: '0728533016',
          password: hashPassword('MyPassword'),
          a_level: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          names: 'Tenant user',
          username: 'tenant',
          phone: '0738533018',
          password: hashPassword('MyPassword'),
          a_level: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
