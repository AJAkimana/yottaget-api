'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        names: {
          type: Sequelize.STRING
        },
        username: {
          type: Sequelize.STRING
        },
        phone: {
          type: Sequelize.STRING
        },
        a_level: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['1', '2', '3']
        },
        password: {
          type: Sequelize.STRING
        },
        prev_passwords: {
          type: Sequelize.STRING
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        uniqueKeys: {
          unique_tag: {
            customIndex: true,
            fields: ['username', 'phone']
          }
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
