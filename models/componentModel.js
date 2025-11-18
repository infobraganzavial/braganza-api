'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Component extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Component.belongsTo(models.Section, {
        foreignKey: 'sectionId',
        onDelete: 'CASCADE'
      })
      Component.hasMany(models.Post, {
        foreignKey: 'ComponentId',
      })
    }
  }
  Component.init({
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(250),
    },
    postsNumber: {
      type: DataTypes.INTEGER,
    },
    sectionId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'a'
    }
  }, {
    sequelize,
    tableName: 'Components',
    modelName: 'Component',
  });
  return Component;
};