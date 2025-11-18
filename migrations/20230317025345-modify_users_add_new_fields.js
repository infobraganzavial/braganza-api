'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'avatar', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Users',
        'token',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Users',
        'confirmEmail',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Users',
        'tokenEmail',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'avatar'),
      queryInterface.removeColumn('Users', 'token'),
      queryInterface.removeColumn('Users', 'confirmEmail'),
      queryInterface.removeColumn('Users', 'tokenEmail'),
    ]);
  }
};