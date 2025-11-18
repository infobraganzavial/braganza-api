'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },      
      title: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      content: {
        type: Sequelize.STRING(250)
      },
      shortDescription: {
        type: Sequelize.STRING(45)
      },
      linkPage: {
        type: Sequelize.STRING(45)
      },
      usersId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'usersId',
        }
      },
      componentId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Components',
          key: 'id',
          as: 'componentId',
        }
      },
      status: {
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: "a"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};