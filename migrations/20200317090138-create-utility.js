'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'utilities',
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
            fields: ['name', 'locationId']
          }
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('utilities');
  }
};
