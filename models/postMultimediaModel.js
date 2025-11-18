'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostMultimedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostMultimedia.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE'
      })
    }
  }
  PostMultimedia.init({
    url: {
      type: DataTypes.STRING(100),
    },
    order: {
      type: DataTypes.INTEGER(11),
    },
    postId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'a'
    }
  }, {
    sequelize,
    tableName: 'PostsMultimedias',
    modelName: 'PostMultimedia',
  });
  return PostMultimedia;
};