'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.belongsTo(models.TypeContact, {
        foreignKey: 'typeContactId',
        onDelete: 'CASCADE'
      })
      Contact.belongsTo(models.Business, {
        foreignKey: 'businessId',
        onDelete: 'CASCADE'
      })
    }
  }
  Contact.init({
    name: {
      type: DataTypes.STRING(45)
    },
    url: {
      type: DataTypes.STRING(100)
    },
    businessId: {
      type: DataTypes.INTEGER,
    },
    typeContactId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "a"
    }
  }, {
    sequelize,
    tableName: 'Contacts',
    modelName: 'Contact',
  });
  return Contact;
};