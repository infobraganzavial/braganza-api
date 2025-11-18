'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Popup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Popup.belongsTo(models.Page, {
        foreignKey: 'pageId',
        onDelete: 'CASCADE'
      })
    }
  }
  Popup.init({
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(250),
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    pageId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'a'
    }
  }, {
    sequelize,
    tableName: 'Popups',
    modelName: 'Popup',
  });
  return Popup;
};