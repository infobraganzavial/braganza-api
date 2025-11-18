'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeContact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TypeContact.hasMany(models.Contact, {
        foreignKey: 'typeContactId',
      })
    }
  }
  TypeContact.init({
    name: {
      type: DataTypes.STRING(45)
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "a"
    }
  }, {
    sequelize,
    tableName: 'TypesContacts',
    modelName: 'TypeContact',
  });
  return TypeContact;
};