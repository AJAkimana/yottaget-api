'use strict';
import { hashPassword } from '../helpers';

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
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          names: 'Landload user',
          username: 'landload',
          phone: '0728533016',
          password: hashPassword('MyPassword'),
          a_level: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          names: 'Tenant user',
          username: 'tenant',
          phone: '0738533018',
          password: hashPassword('MyPassword'),
          a_level: 3,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
