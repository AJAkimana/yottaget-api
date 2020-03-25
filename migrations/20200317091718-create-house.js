'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'houses',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        slug: {
          allowNull: false,
          type: Sequelize.STRING
        },
        price: {
          type: Sequelize.INTEGER
        },
        description: {
          type: Sequelize.STRING
        },
        type: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['house']
        },
        status: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['Pending', 'Booked', 'Available', 'Canceled']
        },
        locationId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'locations',
            key: 'id',
            as: 'locationId'
          }
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'users',
            key: 'id',
            as: 'userId'
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        uniqueKeys: {
          unique_tag: {
            customIndex: true,
            fields: ['name', 'locationId', 'userId']
          }
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('houses');
  }
};
