'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'usersId',
        onDelete: 'CASCADE'
      })
      Post.belongsTo(models.Component, {
        foreignKey: 'componentId',
        onDelete: 'CASCADE'
      })
      Post.hasMany(models.PostMultimedia, {
        foreignKey: 'postId',
      })
      Post.hasMany(models.PostCategoryHasPost, {
        foreignKey: 'postId',
      })
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(250),
    },
    shortDescription: {
      type: DataTypes.STRING(45),
    },
    linkPage: {
      type: DataTypes.STRING(45),
    },
    usersId: {
      type: DataTypes.INTEGER,
    },
    componentId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'a'
    }
  }, {
    sequelize,
    tableName: 'Posts',
    modelName: 'Post',
  });
  return Post;
};