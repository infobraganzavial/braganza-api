'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Business.hasMany(models.User, {
        foreignKey: 'businessId',
      })
      Business.hasMany(models.Contact, {
        foreignKey: 'businessId',
      })
    }
  }
  Business.init({
    name: {
      type: DataTypes.STRING(45)
    },
    address: {
      type: DataTypes.STRING(45)
    },
    aboutUs: {
      type: DataTypes.STRING(1200)
    },
    logo: {
      type: DataTypes.STRING(45)
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "a"
    }
  }, {
    sequelize,
    tableName: 'Businesses',
    modelName: 'Business',
  });
  return Business;
};