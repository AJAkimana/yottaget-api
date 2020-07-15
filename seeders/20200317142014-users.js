'use strict';
import { hashPassword } from '../helpers/util';

export const up = (queryInterface) => {
  return queryInterface.bulkInsert(
    'users',
    [
      {
        names: 'Admin user',
        username: 'adminuser',
        email: 'adminuser@email.com',
        phone: '0781234567',
        password: hashPassword('MyPassword'),
        a_level: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        names: 'Landload user',
        username: 'landload',
        phone: '0721234567',
        password: hashPassword('MyPassword'),
        a_level: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        names: 'Tenant user',
        username: 'tenant',
        phone: '0731234567',
        password: hashPassword('MyPassword'),
        a_level: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
};
export const down = (queryInterface) => {
  return queryInterface.bulkDelete('users', null, {});
};
