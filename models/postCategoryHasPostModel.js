'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostCategoryHasPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostCategoryHasPost.belongsTo(models.PostCategory, {
        foreignKey: 'postCategoryId',
        onDelete: 'CASCADE'
      })
      PostCategoryHasPost.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE'
      })
    }
  }
  PostCategoryHasPost.init({
    postCategoryId: {
      type: DataTypes.INTEGER
    },
    postId: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    timestamps: false,
    tableName: 'PostsCategoriesHasPosts',
    modelName: 'PostCategoryHasPost',
  });
  return PostCategoryHasPost;
};