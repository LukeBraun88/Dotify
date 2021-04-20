'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'DemoUser',
      email: 'demo@user.com',
      hashedPassword: 'DemoUser',
      profileImageUrl: 'https://lukes-bucket-88.s3.amazonaws.com/1611967431296.jpg'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
