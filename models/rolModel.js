'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rol.hasMany(models.User, {
        foreignKey: 'rolId',
      })
    }
  }
  Rol.init({
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'a'
    }
  }, {
    sequelize,
    tableName: 'Roles',
    modelName: 'Rol',
  });
  return Rol;
};