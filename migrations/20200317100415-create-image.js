'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'images',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        link: {
          type: Sequelize.STRING
        },
        houseId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'houses',
            key: 'id',
            as: 'houseId'
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
            fields: ['link', 'houseId']
          }
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('images');
  }
};
