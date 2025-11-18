'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Page.hasMany(models.Section, {
        foreignKey: 'pageId',
      })
      Page.hasMany(models.Popup, {
        foreignKey: 'PageId',
      })
    }
  }
  Page.init({
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING(250),
    },
    urlImage: {
        type: DataTypes.STRING(100),
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'a'
    }
  }, {
    sequelize,
    tableName: 'Pages',
    modelName: 'Page',
  });
  return Page;
};