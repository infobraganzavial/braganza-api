'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PostsCategoriesHasPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postCategoryId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'PostsCategories',
          key: 'id',
          as: 'postCategoryId',
        }
      },
      postId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Posts',
          key: 'id',
          as: 'postId',
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PostsCategoriesHasPosts');
  }
};