'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Businesses', // table name
      'aboutUs', // new field name
      {
        type: Sequelize.STRING(1200),
        allowNull: true,
      },
    )
  },
  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Businesses', 'aboutUs')
  }
};
