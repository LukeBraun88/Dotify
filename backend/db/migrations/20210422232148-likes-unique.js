'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Likes', ['userId', 'songId'], {
      type: 'unique',
      name: 'users-likes'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Likes', 'users-likes');
  }
};
