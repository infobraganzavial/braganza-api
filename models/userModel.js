'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Rol, {
        foreignKey: 'rolId',
        onDelete: 'CASCADE'
      })
      User.belongsTo(models.Business, {
        foreignKey: 'businessId',
        onDelete: 'CASCADE'
      })
      User.hasMany(models.Post, {
        foreignKey: 'usersId',
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(100),
    },
    token: {
      type: DataTypes.STRING(250),
    },
    confirmEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    tokenEmail: {
      type: DataTypes.STRING(100),
    },
    rolId: {
      type: DataTypes.INTEGER,
    },
    businessId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "a"
    }
  }, {
    sequelize,
    tableName: 'Users',
    modelName: 'User',
  });
  return User;
};