'use strict';

const { UserSchema, USER_TABLE } = require('../models/userModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(
      USER_TABLE,
      'recovery_token',
      UserSchema.recoveryToken
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  },
};
