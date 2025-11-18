'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Components', {
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
      description: {
        type: Sequelize.STRING(250)
      },
      postsNumber: {
        type: Sequelize.INTEGER
      },
      sectionId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Sections',
          key: 'id',
          as: 'sectionId',
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
    await queryInterface.dropTable('Components');
  }
};