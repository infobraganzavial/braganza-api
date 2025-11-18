'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Section.belongsTo(models.Page, {
        foreignKey: 'pageId',
        onDelete: 'CASCADE'
      })
      Section.hasMany(models.Component, {
        foreignKey: 'sectionId',
      })
    }
  }
  Section.init({
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(250),
    },
    background: {
      type: DataTypes.STRING(45),
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
    tableName: 'Sections',
    modelName: 'Section',
  });
  return Section;
};